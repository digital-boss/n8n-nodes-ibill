/**
 * Generic instruments, helping to build and execute HTTP requiests for an API with resource and operation patttern:
 * - ResourceApiBase
 * - OperationExecutor
 */

import {
	CoreOptions,
	OptionsWithUri,
} from 'request';

import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	IDataObject,
	INodeCredentialTestResult,
	JsonObject,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';
import { IBillApiCredentials } from '../../credentials/IBillApi.credentials';

export const normalizeHost = (hostName: string) => hostName.replace(/\/$/, '');

export class ResourceApiBase {
	constructor (execFns: IExecuteFunctions, creds: IBillApiCredentials) {
		this.execFns = execFns;
		this.credentials = creds;
	}

	indexItem = 0;
	protected execFns: IExecuteFunctions;
	private credentials: IBillApiCredentials;

	private applyPathParams = (path: string): string => {
		const rx = new RegExp(':[a-zA-Z_][a-zA-Z0-9]+', 'g');
		const matches = path.match(rx);
		if (matches && matches.length > 0) {
			matches.forEach((match, i) => {
				const value = this.getParam<string>(match.slice(1));
				if (value !== undefined) {
					path = path.replace(match, value);
				}
			});
		}
		return path;
	}

	// tslint:disable-next-line: no-any
	protected strip = (transformer?: (res: any) => any) => (res: any) => {
		if (res.success) {
			return transformer ? transformer(res) : res;
		} else {
			throw new NodeApiError(this.execFns.getNode(), res, { message: res.errMsg });
		}
	}

	protected buildRequest = (path: string, coreOpts: CoreOptions): OptionsWithUri => {

		const pathWithValues = this.applyPathParams(path);

		return Object.assign(coreOpts, {
			headers: {
				'IBILL-API-KEY': this.credentials.apiKey,
			},
			uri: normalizeHost(this.credentials.server) + '/api/v1' + pathWithValues,
			json: true,
		});
	}

	// tslint:disable-next-line: no-any
	protected execute = async (path: string, coreOpts: CoreOptions): Promise<any> => {
		const opts = this.buildRequest(path, coreOpts);
		return await this.execFns.helpers.request!(opts);
	}

	protected getParam = <TRes>(name: string): TRes => {
		return this.execFns.getNodeParameter(name, this.indexItem) as unknown as TRes;
	}

	protected getParams = (names: string[]): IDataObject => {
		return names.reduce((acc, name) => {
			const value = this.getParam<string>(name);
			if (value !== undefined) {
				acc[name] = value;
			}
			return acc;
		}, {} as IDataObject);
	}
}

export interface IResourceTypes {
	[key: string]: typeof ResourceApiBase;
}

export class OperationExecutor {

	private itemIndex = 0;

	// tslint:disable-next-line: no-any
	private opearationFn: () => Promise<any>;

	constructor(
		resourceTypes: IResourceTypes,
		resource: string,
		operation: string,
		execFns: IExecuteFunctions,
		creds: IBillApiCredentials,
	) {
		const res = resourceTypes[resource];
		if (!res) {
			throw new Error(`There is no resource: '${resource}'`);
		}

		const resourceApi = new res(execFns, creds);

		// tslint:disable-next-line: no-any
		const op = (resourceApi as any)[operation];

		if (!op) {
			throw new Error(`Resource '${resource}' has no operation '${operation}'`);
		}

		this.opearationFn = op;
	}

	// tslint:disable-next-line: no-any
	execute = async (itemIndex: number): Promise<any> => {
		this.itemIndex = itemIndex;
		return this.opearationFn();
	}
}
