
import {
	OptionsWithUri,
} from 'request';


import {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	INodeCredentialTestResult,
	JsonObject,
} from 'n8n-workflow';
import { IBillApiCredentials } from '../../credentials/IBillApi.credentials';
import { normalizeHost } from './GenericFunctions';


export async function iBillApiTest(this: ICredentialTestFunctions, credentials: ICredentialsDecrypted): Promise<INodeCredentialTestResult> {
	const creds = credentials.data as unknown as IBillApiCredentials;

	const options: OptionsWithUri = {
		headers: {
			'IBILL-API-KEY': creds.apiKey,
		},
		method: 'GET',
		uri: normalizeHost(creds.server) + '/api/v1/resellers?limit=1&offset=0',
		json: true,
	};

	try {
		await this.helpers.request!(options);
	} catch (error) {
		return {
			status: 'Error',
			message: `Connection details not valid: ${(error as JsonObject).message}`,
		};
	}

	return {
		status: 'OK',
		message: 'Authentication successful!',
	};
}
