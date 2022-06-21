## [0.1.4](https://github.com/digital-boss/n8n-nodes-ibill/compare/0.1.0...0.1.4) 2022-06-21

### Features

1. Session resource:

	1.1. Added two operations dealing with corresponding endpoints:

		- /radius/sessions/history;
		- /radius/sessions/service_history/:id;

	1.2. Added sorting fields: seen, stop. Stop is for history operations only.

2. Service resource:

	2.1. Added external param to get operation.

## 0.1.0

### Features

Customer

	POST /customer/create
	GET /customer/:id
	GET /customers
	PUT /customer/:id
Product

	GET /product/:id
	GET /products
Service

	POST /services/data_service/create
	GET /service/:id
	GET /services
	PUT /service/:id
	GET /data_service/:username'
	POST /service/:id/schedule_suspend
	GET /service/:id/cancel_suspend
Session

	GET /radius/sessions/active
	GET /radius/sessions/service_active/:id
