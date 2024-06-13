import { Injectable } from "@nestjs/common";
import { GoogleService } from "./modules/google";
import { AccountsService } from "@modules/accounts";
import { CryptoService } from "@modules/crypto";
import { Account } from "@entities";
import { CallbackMode, Env, OAuthProvider } from "@utils";
import { MissingEmailError, MissingGoogleIdTokenError } from "./errors";
import { GetLoginUriQuery } from "./dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly googleService: GoogleService,
        private readonly accountsService: AccountsService,
        private readonly cryptoService: CryptoService
    ) {}

    getLoginUri(query: GetLoginUriQuery) {
        switch (query.provider) {
            case OAuthProvider.GOOGLE:
                let redirectUri = "";
                switch (query.callbackMode) {
                    case CallbackMode.LOGIN:
                        redirectUri = Env.GOOGLE_LOGIN_REDIRECT_URI;
                        break;
                    case CallbackMode.SIGN_UP:
                        redirectUri = Env.GOOGLE_SIGN_UP_REDIRECT_URI;
                        break;
                }
                return this.googleService.getOauth2Uri({
                    clientId: Env.GOOGLE_CLIENT_ID,
                    redirectUri: redirectUri,
                    responseType: "code",
                    scopes: [GoogleService.SCOPE_EMAIL, GoogleService.SCOPE_PROFILE]
                });
        }
    }

    async getGoogleTokenInfo(code: string, mode: CallbackMode) {
        let redirectUri = "";
        switch (mode) {
            case CallbackMode.LOGIN:
                redirectUri = Env.GOOGLE_LOGIN_REDIRECT_URI;
                break;
            case CallbackMode.SIGN_UP:
                redirectUri = Env.GOOGLE_SIGN_UP_REDIRECT_URI;
                break;
        }

        const token = await this.googleService.getToken({
            clientId: Env.GOOGLE_CLIENT_ID,
            clientSecret: Env.GOOGLE_CLIENT_SECRET,
            code: code,
            grantType: "authorization_code",
            redirectUri: redirectUri
        });

        if (!token.id_token) throw new MissingGoogleIdTokenError();

        const tokenInfo = await this.googleService.getTokenInfo(token.id_token);
        return tokenInfo;
    }

    async loginWithGoogle(code: string): Promise<[Account, string]> {
        const tokenInfo = await this.getGoogleTokenInfo(code, CallbackMode.LOGIN);
        if (!tokenInfo.email) throw new MissingEmailError();

        const account = await this.accountsService.getOneByEmailOrFail(tokenInfo.email);
        const accessToken = this.cryptoService.signJwtToken(account.id);

        return [account, accessToken]
    }
}