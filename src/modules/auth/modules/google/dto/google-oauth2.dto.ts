export class GoogleOauth2Dto {
    clientId: string;
    redirectUri: string;
    scopes: string[];
    responseType: string;
    state?: string;
}