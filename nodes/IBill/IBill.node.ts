
import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import {
	OperationExecutor,
} from './GenericFunctions';

import { version } from '../version';
import {
	customerFields,
	productFields,
	serviceFields,
	sessionFields
} from './descriptions';
import { IBillApiCredentials } from '../../credentials/IBillApi.credentials';
import { resourceTypes } from './Resources';
import { iBillApiTest } from './IBillApiTest';


export class IBill implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'iBill.io',
		name: 'iBillCRM',
		icon: 'file:iBill.png',
		group: [],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: `Consume iBill.io API (v.${version})`,
		defaults: {
			name: 'iBill.io',
			color: '#c8d1df',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'iBillApi',
				required: true,
				testedBy: 'iBillApiTest',
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Service',
						value: 'service',
					},
					{
						name: 'Session',
						value: 'session',
					},
				],
				default: 'customer',
			},
			...customerFields,
			...productFields,
			...serviceFields,
			...sessionFields,
		],
	};

	methods = {
		credentialTest: {
			iBillApiTest,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const credentials = await this.getCredentials('iBillApi') as unknown as IBillApiCredentials;
		const items = this.getInputData();
		const length = items.length;
		const returnData: IDataObject[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operationName = this.getNodeParameter('operation', 0) as string;

		// [
		// 	'name',
		// 	'email',
		// 	'tags',
		// 	'additionalFields',
		// ].forEach(i => {
		// 	const p = this.getNodeParameter(i, 0);
		// 	console.log(`param ${i}: `);
		// 	console.log(p);
		// });

		//return [this.helpers.returnJsonArray(returnData)];

		// tslint:disable-next-line: no-any
		let operation: OperationExecutor;
		try {
			operation = new OperationExecutor(resourceTypes, resource, operationName, this, credentials);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), error);
		}

		for (let itemIndex = 0; itemIndex < length; itemIndex++) {
			try {
				const result = await operation.execute(itemIndex);
				console.log(result);
				if (result.constructor === Array) {
					returnData.push.apply(returnData, result);
				} else {
					returnData.push(result);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
