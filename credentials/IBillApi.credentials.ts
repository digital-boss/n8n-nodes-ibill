import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';


export interface IBillApiCredentials {
	server: string;
	apiKey: string;
}

export class IBillApi implements ICredentialType {
	name = 'iBillApi';
	displayName = 'iBill.io API';
	documentationUrl = 'iBill';
	properties: INodeProperties[] = [
		{
			displayName: 'iBILL Server',
			name: 'server',
			type: 'string',
			default: 'https://ibill.io',
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
