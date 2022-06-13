/**
 * Here we put all Business Logic: how requests are build and how responses are trasformed.
 * Each resource is a class.
 * Each operation is method of specific resource class.
 */

import { IResourceTypes, ResourceApiBase } from './GenericFunctions';


class IBillApiBase extends ResourceApiBase {
	getOffsetLimit = () => {
		// tslint:disable-next-line: no-any
		const offsetLimit = this.getParam('offsetAndLimit') as any;
		if (offsetLimit.offsetAndLimitValues) {
			return offsetLimit.offsetAndLimitValues;
		}
		return {};
	}
}

class Customer extends IBillApiBase {

	create = async () => {
		return this.execute('/customer/create', {
			method: 'POST',
			body: {
				...this.getParams([
					'name',
					'email',
					'tags',
				]),
				// tslint:disable-next-line: no-any
				...this.getParam<any>('additionalFields'),
			},
		}).then(this.strip(r => r.customer));
	};

	get = async () => {
		return this.execute('/customer/:id', {
			method: 'GET',
		}).then(this.strip(r => r.customer));

	};

	getAll = async () => {
		return this.execute('/customers', {
			method: 'GET',
			qs: this.getOffsetLimit(),
		}).then(this.strip(r => r.customers));
	};

	update  = async () => {
		return this.execute('/customer/:id', {
			method: 'PUT',
			// tslint:disable-next-line: no-any
			body: this.getParam<any>('additionalFields'),
		}).then(this.strip(r => r.customer));
	};
}

class Product extends IBillApiBase {
	get = async () => {
		return this.execute('/product/:id', {
			method: 'GET',
		}).then(this.strip(r => r.product));
	};

	getAll = async () => {
		return this.execute('/products', {
			method: 'GET',
			qs: this.getOffsetLimit(),
		}).then(this.strip(r => r.products));
	};
}

class Service extends IBillApiBase {

	create = async () => {

		return this.execute('/services/data_service/create', {
			method: 'POST',
			body: {
				...this.getParams([
					'username',
					'customer_id',
					'product_id',
				]),
				// tslint:disable-next-line: no-any
				...this.getParam<any>('additionalFields'),
			},
		}).then(this.strip(r => r.data_service));
	};

	get = async () => {
		return this.execute('/service/:id', {
			method: 'GET',
		}).then(this.strip(r => r.service));
	};

	getAll = async () => {
		return this.execute('/services', {
			method: 'GET',
			qs: this.getOffsetLimit(),
		}).then(this.strip(r => r.services));
	};

	update = async () => {
		return this.execute('/service/:id', {
			method: 'PUT',
			// tslint:disable-next-line: no-any
			body: this.getParam<any>('additionalFields'),
		}).then(this.strip(r => r.service));
	};

	getByUsername = async () => {
		return this.execute('/data_service/:username', {
			method: 'GET',
		}).then(this.strip(r => r.service));
	};

	scheduleSuspension = async () => {
		return this.execute('/service/:id/schedule_suspend', {
			method: 'POST',
			body: this.getParams([
				'date',
			]),
		}).then(this.strip());
	};

	cancelSuspension = async () => {
		return this.execute('/service/:id/cancel_suspend', {
			method: 'GET',
		}).then(this.strip());
	};

}

class Session extends IBillApiBase {

	listActive = async () => {
		return this.execute('/radius/sessions/active', {
			method: 'GET',
			qs: Object.assign(this.getParams([
				'order_field',
				'order_dir',
			]), this.getOffsetLimit()),
		}).then(this.strip(r => r.active_sessions));
	};

	listActiveForService = async () => {
		return this.execute('/radius/sessions/service_active/:id', {
			method: 'GET',
			qs: this.getOffsetLimit(),
		}).then(this.strip(r => r.active_sessions));
	};

}

export const resourceTypes: IResourceTypes = {
	'customer': Customer,
	'product': Product,
	'service': Service,
	'session': Session,
};
