import {
	INodeProperties
} from 'n8n-workflow';

export const getListFields = (): INodeProperties[] => ([
	{
		displayName: 'Offset',
		name: 'offset',
		placeholder: '0',
		description: 'The record number of the first record in the range of records',
		type: 'number',
		default: '1',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		placeholder: '100',
		description: 'Max number of results to return',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: '100',
	},
]);

export const getIdField = (displayName: string): INodeProperties => ({
	displayName,
	name: 'id',
	type: 'number',
	default: '',
});
