import { INodeProperties } from 'n8n-workflow';
import * as h from './helpers';
import * as cmn from './iBillCommon';

const resource = 'service';

const operations: INodeProperties[] = h.showFor(resource, undefined, [
	h.createOperation(
		[
			...h.getCommonOperations('Service', 'Services', undefined, ['delete']),
			{
				name: 'Get by Username',
				value: 'getByUsername',
				description: 'Get a Data Service by Username',
			},
			{
				name: 'Schedule suspension',
				value: 'scheduleSuspension',
				description: 'Schedule Suspension (non-invoiced services)',
			},
			{
				name: 'Cancel suspension',
				value: 'cancelSuspension',
				description: 'Cancel Scheduled Suspension',
			},
		],
		'getAll',
	),
]);

const serviceEntity: INodeProperties[] = [
	cmn.getIdField('Service ID'),
	{
		displayName: 'User Name',
		name: 'username',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Customer ID',
		name: 'customer_id',
		type: 'number',
		default: 0,
	},
	{
		displayName: 'Price',
		name: 'price',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Product ID',
		name: 'product_id',
		type: 'number',
		default: 0,
	},
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
		default: true,
	},
	{
		displayName: 'Suspend',
		name: 'suspend',
		type: 'boolean',
		default: false,
	},
	{
		displayName: 'Cancel',
		name: 'cancel',
		type: 'boolean',
		default: false,
	},
	{
		displayName: 'Last Invoice',
		name: 'last_invoice',
		type: 'dateTime',
		default: '',
	},
	{
		displayName: 'Next Invoice',
		name: 'next_invoice',
		type: 'dateTime',
		default: '',
	},
	{
		displayName: 'Last Recharge',
		name: 'last_recharge',
		type: 'dateTime',
		default: '',
	},
	{
		displayName: 'Recurr',
		name: 'recurr',
		type: 'boolean',
		default: false,
	},
	{
		displayName: 'Billing Cycle',
		name: 'billing_cycle',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Discount',
		name: 'discount',
		type: 'number',
		default: 0,
	},
	{
		displayName: 'Billing Date',
		name: 'billing_date',
		type: 'dateTime',
		default: '',
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		default: [],
		typeOptions: {
			multipleValues: true,
		},
		description: 'Tags associated with this service',
	},
	{
		displayName: 'External ID',
		name: 'external_id',
		type: 'number',
		default: 0,
	},
];

const createFields: INodeProperties[] = h.showFor(resource, 'create', [
	...h.getFields(serviceEntity, [
		'username',
		'customer_id',
		'product_id',
	], {required: true}),
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: h.getFields(serviceEntity, [
			'price',
			'enabled',
			'discount',
			'tags',
			'external_id',
		]),
	},
]);

const getByUsernameFields: INodeProperties[] = h.showFor(resource, 'getByUsername', [
	h.getField(serviceEntity, 'username', {required: true}),
]);

const getFields: INodeProperties[] = h.showFor(resource, 'get', [
	h.getField(serviceEntity, 'id', {required: true}),
]);

const getAllFields: INodeProperties[] = h.showFor(
	resource,
	'getAll',
	[cmn.getListFields()],
);

const updateFields: INodeProperties[] = h.showFor(resource, 'update', [
	h.getField(serviceEntity, 'id', {required: true}),
	{
		displayName: 'Fields to Update',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: h.getFields(serviceEntity, [
			'price',
			'enabled',
			'suspend',
			'cancel',
			'last_invoice',
			'next_invoice',
			'last_recharge',
			'recurr',
			'billing_cycle',
			'discount',
			'billing_date',
			'tags',
			'external_id',
		]),
	},
]);

const scheduleSuspensionFields: INodeProperties[] = h.showFor(
	resource,
	'scheduleSuspension',
	[
		h.getField(serviceEntity, 'id', {required: true}),
		{
			displayName: 'Suspension Date',
			name: 'date',
			description: 'Date to schedule suspension',
			type: 'dateTime',
			default: '',
			required: true,
		},
	],
);

const cancelSuspensionFields: INodeProperties[] = h.showFor(
	resource,
	'cancelSuspension',
	[
		h.getField(serviceEntity, 'id', {required: true}),
	],
);

export const serviceFields: INodeProperties[] = Array.prototype.concat(
	operations,
	createFields,
	getByUsernameFields,
	getFields,
	getAllFields,
	updateFields,
	scheduleSuspensionFields,
	cancelSuspensionFields,
);
