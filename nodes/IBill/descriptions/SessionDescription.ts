import {
	INodeProperties
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
	],
	'listActive',
)]);

const listActiveFields: INodeProperties[] = h.showFor(resource, 'listActive', [
	...cmn.getListFields(),
	{
		displayName: 'Order Field',
		name: 'order_field',
		type: 'options',
		options: [
			{
				name: 'Start',
				value: 'start',
			},
		],
		default: 'start',
	},
	{
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
]);

const listActiveForServiceFields: INodeProperties[] = h.showFor(resource, 'listActiveForService', [
	{
		displayName: 'Service ID',
		name: 'id',
		type: 'number',
		default: 0,
		required: true,
	},
	...cmn.getListFields(),
]);

export const sessionFields: INodeProperties[] = Array.prototype.concat(
	operations,
	listActiveFields,
	listActiveForServiceFields,
);
