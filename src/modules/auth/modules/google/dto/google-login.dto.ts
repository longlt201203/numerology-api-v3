export class GetTokenDto {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    grantType: string;
    idToken?: string;
}