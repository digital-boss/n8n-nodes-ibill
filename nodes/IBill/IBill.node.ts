import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	IDataObject,
	INodeCredentialTestResult,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import {
	iBillApiTest,
} from './GenericFunctions';

import {
	OptionsWithUri
} from 'request';

import { version } from '../version';

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
				displayName: 'LaLa',
				name: 'lala',
				type: 'string',
				default: '',
				description: 'ToDo: remove it',
			},
		], // iBillNodeFields,
	};

	methods = {
		credentialTest: {
			iBillApiTest,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// const items = this.getInputData();
		// const module = this.getNodeParameter('module', 0) as string;
		// const operation = this.getNodeParameter('operation', 0) as string;
		// const returnData: IDataObject[] = [];
		// const length = items.length;

		// for (let indexItem = 0; indexItem < length; indexItem++) {
		// 	try {
		// 		await executeItem.call(this, indexItem, module, operation, returnData);
		// 	} catch (error) {
		// 		if (this.continueOnFail()) {
		// 			returnData.push({ error: error.message });
		// 			continue;
		// 		}
		// 		throw error;
		// 	}
		// }
		// return [this.helpers.returnJsonArray(returnData)];
		return [];
	}
}
