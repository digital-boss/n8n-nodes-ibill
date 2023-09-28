# n8n-nodes-ibill

iBill.io API automation.

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
		GET /radius/sessions/history
		GET /radius/sessions/service_history/:id


[Click here to see the rest of the README](https://digital-boss.de/n8n/?packageName=n8n-nodes-ibill)
