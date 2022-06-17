import {
	ILoadOptionsFunctions,
	INodeProperties,
	INodePropertyOptions
} from 'n8n-workflow';
import * as h from './helpers';
import * as cmn from './iBillCommon';

const resource = 'session';

const operations: INodeProperties[] = h.showFor(resource, undefined, [h.createOperation(
	[
		{
			name: 'List Active',
			value: 'listActive',
			description: 'List Active Sessions',
		},
		{
			name: 'List For a Service',
			value: 'listActiveForService',
			description: 'List Active Sessions For a Service',
		},
		{
			name: 'List Session History',
			value: 'listHistory',
			description: 'List Session History',
		},
		{
			name: 'List History for a Service',
			value: 'listHistoryForService',
			description: 'List Session History for a Service',
		},
	],
	'listActive',
)]);

const orderOptions: INodePropertyOptions[] = [
	{
		name: 'Start',
		value: 'start',
	},
	{
		name: 'Seen',
		value: 'seen',
	},
	{
		name: 'Stop',
		value: 'stop',
	},
];

const order: INodeProperties[] = [
	{
		displayName: 'Order Field',
		name: 'order_field',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'loadOrderFields',
			loadOptionsDependsOn: [
				'resource',
				'operation',
			],
		},
		default: 'start',
	}, {
		displayName: 'Order Direction',
		name: 'order_dir',
		type: 'options',
		options: [
			{
				name: 'Ascending',
				value: 'asc',
			},
			{
				name: 'Descending',
				value: 'desc',
			},
		],
		default: 'asc',
	},
];

const list = h.makeOptionalFields([
	...order,
	...cmn.getListFields(),
]);

export const loadOrderFields = async function (this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const res = this.getCurrentNodeParameter('resource');
	const op = this.getCurrentNodeParameter('operation');

	if (res === resource && (op === 'listActive' || op === 'listActiveForService')) {
		return orderOptions.filter(i => i.value !== 'stop');
	}
	return orderOptions;
};

/******************************************************************************
 * Fields Descriptions
 */

const listActiveFields: INodeProperties[] = h.showFor(resource, 'listActive', [list]);

const listActiveForServiceFields: INodeProperties[] = h.showFor(resource, 'listActiveForService', [
	{
		displayName: 'Service ID',
		name: 'id',
		type: 'number',
		default: 0,
		required: true,
	},
	list,
]);

const listHistoryFields: INodeProperties[] = h.showFor(resource, 'listHistory', [list]);

const listHistoryForServiceFields: INodeProperties[] = h.showFor(resource, 'listHistoryForService', [
	{
		displayName: 'Service ID',
		name: 'id',
		type: 'number',
		default: 0,
		required: true,
	},
	list,
]);

export const sessionFields: INodeProperties[] = Array.prototype.concat(
	operations,
	listActiveFields,
	listActiveForServiceFields,
	listHistoryFields,
	listHistoryForServiceFields,
);
