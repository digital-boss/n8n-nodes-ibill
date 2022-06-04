import {
	INodeProperties, INodePropertyCollection, INodePropertyOptions
} from 'n8n-workflow';
import * as h from './helpers';
import * as cmn from './iBillCommon';

const resource = 'customer';

const operations: INodeProperties[] = h.showFor(resource, undefined, [h.createOperation(
	h.getCommonOperations('Customer', 'Customers', undefined, ['delete']),
	'getAll',
)]);

const customerEntity: INodeProperties[] = [
	cmn.getIdField('Customer ID'),
	{
		displayName: 'Name',
		name: 'name',
		description: 'Name of the customer',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Email',
		name: 'email',
		description: 'Email of the customer',
		type: 'string',
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
		description: 'Tags associated with this customer',
	},
	{
		displayName: 'Phone number',
		name: 'phone_number',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
		default: true,
	},
	{
		displayName: 'Address',
		name: 'address1',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Address 2',
		name: 'address2',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Сity',
		name: 'city',
		type: 'string',
		default: '',
	},
	{
		displayName: 'State',
		name: 'state',
		type: 'string',
		default: '',
	},
	{
		displayName: 'PoCode',
		name: 'pocode',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Country',
		name: 'country',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Tax ID',
		name: 'tax_id',
		type: 'string',
		default: '',
	},
	{
		displayName: 'SSN',
		name: 'ssn',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Tax Rate',
		name: 'tax_rate',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Discount Percent',
		name: 'discount_pct',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Discount Expires',
		name: 'discount_expires',
		type: 'dateTime',
		default: '',
	},
	{
		displayName: 'Discount Description',
		name: 'discount_description',
		type: 'string',
		default: '',
	},
	{
		displayName: 'GPS Latitude',
		name: 'gps_lat',
		type: 'number',
		default: '',
	},
	{
		displayName: 'GPS Longitude',
		name: 'gps_long',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Do Not Suspend',
		name: 'do_not_suspend',
		type: 'boolean',
		default: false,
	},
	{
		displayName: 'Reseller ID',
		name: 'reseller_id',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Email Notifications',
		name: 'email_notifications',
		type: 'boolean',
		default: false,
	},
];

const createFields: INodeProperties[] = h.showFor(resource, 'create', [
	...h.getFields(customerEntity, ['name', 'email'], {required: true}),
	h.getField(customerEntity, 'tags'),
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: h.getFieldsExcept(customerEntity, ['id', 'name', 'email', 'tags']),
	},
]);

const getFields: INodeProperties[] = h.showFor(resource, 'get', [
	h.getField(customerEntity, 'id', {required: true}),
]);

const getAllFields: INodeProperties[] = h.showFor(resource, 'getAll', cmn.getListFields());

const updateFields: INodeProperties[] = h.showFor(resource, 'update', [
	h.getField(customerEntity, 'id', {required: true}),
	{
		displayName: 'Fields to update',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: h.getFieldsExcept(customerEntity, ['id']),
	},
]);

export const customerFields: INodeProperties[] = Array.prototype.concat(
	operations,
	createFields,
	getFields,
	getAllFields,
	updateFields,
);
