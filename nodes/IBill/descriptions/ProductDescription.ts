import {
	INodeProperties
} from 'n8n-workflow';
import * as h from './helpers';
import * as cmn from './iBillCommon';

const resource = 'product';

const operations: INodeProperties[] = h.showFor(resource, undefined, [h.createOperation(
	h.getCommonOperations('Product', 'Products', ['get', 'getAll']),
	'getAll',
)]);

const getFields: INodeProperties[] = h.showFor(resource, 'get', [cmn.getIdField('Product ID')]);

const getAllFields: INodeProperties[] = h.showFor(resource, 'getAll', [cmn.getListFields()]);

export const productFields: INodeProperties[] = Array.prototype.concat(
	operations,
	getFields,
	getAllFields,
);
