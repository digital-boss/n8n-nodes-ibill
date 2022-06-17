/**
 * Generic functions, helping to describe any API.
 */

import {
	IDataObject,
	IDisplayOptions,
	INodeProperties,
	INodePropertyOptions,
	NodeParameterValue
} from 'n8n-workflow';
import { resourceLimits } from 'worker_threads';

import merge from 'lodash.merge';

export const showFor = (resource: string|undefined, operation: string|undefined, fields: INodeProperties[]) => {
	return fields.map(i => Object.assign({}, i, {
		displayOptions: merge(getDisplayOptionsFor(resource, operation), i.displayOptions),
	}));
};

export const getFields = (collection: INodeProperties[], names: string[], overrides?: Partial<INodeProperties>): INodeProperties[] => {
	const result = [...collection.filter(i => names.includes(i.name))];
	return overrides ? result.map(i => Object.assign({}, i, overrides)) : result;
};

export const getFieldsExcept = (collection: INodeProperties[], names: string[], overrides?: Partial<INodeProperties>): INodeProperties[] => {
	const result = [...collection.filter(i => !names.includes(i.name))];
	return overrides ? result.map(i => Object.assign({}, i, overrides)) : result;
};

export const getField = (collection: INodeProperties[], name: string, overrides?: Partial<INodeProperties>): INodeProperties => {
	const result = collection.find(i => name === i.name);
	if (result === undefined) {
		throw new Error(`Field not found: '${name}'`);
	}

	return overrides ? Object.assign({}, result, overrides) : {...result}; // create new object to prevent accidentally change source props
};

const getDisplayOptionsFor = (resource: string|undefined, operation: string|undefined): IDisplayOptions => {
	const result: IDisplayOptions = {
		show: {},
	};

	if (resource)	{
		result.show!.resource = [resource];
	}
	if (operation) {
		result.show!.operation = [operation];
	}

	return result;
};

export const createOperation = (options: INodePropertyOptions[], defaultOp: string): INodeProperties => {
	return {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: defaultOp,
		options,
	};
};

export const getCommonOperations = (entity: string, entityPlural: string, includeOnly?: string[], exclude?: string[]): INodePropertyOptions[] => {
	const vowels = ['a', 'e', 'i', 'o', 'u'];

	const article = vowels.includes(entity[0]) ? 'an' : 'a';

	let list = [
		{
			name: 'Create',
			value: 'create',
			description: `Create ${article} ${entity}`,
		},
		{
			name: 'Delete',
			value: 'delete',
			description: `Delete ${article} ${entity}`,
		},
		{
			name: 'Get',
			value: 'get',
			description: `Retrieve ${article} ${entity}`,
		},
		{
			name: 'Get All',
			value: 'getAll',
			description: `Retrieve all ${entityPlural}`,
		},
		{
			name: 'Update',
			value: 'update',
			description: `Update ${article} ${entity}`,
		},
	];

	if (includeOnly) {
		list = list.filter(i => includeOnly.includes(i.value));
	}

	if (exclude) {
		list = list.filter(i => !exclude.includes(i.value));
	}

	return list;
};

export const makeOptionalFields = (options: INodeProperties[]): INodeProperties => {
	return {
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Add Parameter',
		default: [],
		options,
	};
};
