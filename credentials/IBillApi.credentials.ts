import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class IBillApi implements ICredentialType {
	name = 'iBillApi';
	displayName = 'iBILL.io API';
	documentationUrl = 'iBill';
	properties: INodeProperties[] = [
		{
			displayName: 'iBILL Server',
			name: 'server',
			type: 'string',
			default: '',
		},
		{
			displayName: 'iBILL API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}
