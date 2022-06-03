# n8n-nodes-ibill

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

iBill.io API automation.

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

# Latest functionality

Displayed the package version in the node description. For reference, you can check [genversion](https://www.npmjs.com/package/genversion).

# Contribution

To make this node even better, please let us know, [how you use it](mailto:info@digital-north-consulting.com). Commits are always welcome.

# Issues

If you have any issues, please [let us know on GitHub](https://github.com/digital-boss/n8n-nodes-ibill/issues).

# About

Nodes by [digital-north-consulting.com](https://digital-north-consulting.com). For productive use and consulting on this, [contact us please](mailto:info@digital-north-consulting.com).

Special thanks to [N8n nodemation](https://n8n.io) workflow automation by Jan Oberhauser.

## License

[Apache 2.0 with Commons Clause](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/LICENSE.md)
