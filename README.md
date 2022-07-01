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


## Try it out with docker

The recommended way is using our docker image [Digital Boss' N8N custom nodes docker image](https://hub.docker.com/r/digitalboss/n8n-custom-nodes)

## Another way to try it out

[N8N documentation on custom nodes](https://docs.n8n.io/nodes/creating-nodes/create-n8n-nodes-module.html)

Clone the n8n-nodes-ibill repository and execute:
```
# Install dependencies
npm install

# Build the code
npm run build

# "Publish" the package locally
npm link
```

Create an N8N installation and add the n8n-nodes-ibill to it:
```
# Create an N8N installation
cd ..
mkdir n8n_install
cd n8n_install
npm init
npm install
npm install n8n

# "Install" the locally published module
npm link @digital-boss/n8n-nodes-ibill

# Start n8n
npx n8n
```

# Contribution

To make this node even better, please let us know, [how you use it](mailto:info@digital-north-consulting.com). Commits are always welcome. If you have any issues, please [let us know on GitHub](https://github.com/digital-boss/n8n-nodes-ibill/issues).

# About

Nodes by [digital-north-consulting.com](https://digital-north-consulting.com). For productive use and consulting on this, [contact us please](mailto:info@digital-north-consulting.com).

Special thanks to [N8n nodemation](https://n8n.io) workflow automation by Jan Oberhauser.

# License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
