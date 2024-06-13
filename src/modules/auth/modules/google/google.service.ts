import { Injectable } from "@nestjs/common";
import { GetTokenDto, GoogleOauth2Dto, GoogleTokenResponseDto, GoogleTokeninfoResponseDto } from "./dto";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { GoogleGetTokenError, GoogleGetTokenInfoError } from "./errors";

@Injectable()
export class GoogleService {
    static readonly API_OAUTH2 = "https://accounts.google.com/o/oauth2/v2/auth";
    static readonly API_TOKEN = "https://oauth2.googleapis.com/token";
    static readonly API_TOKEN_INFO = "https://oauth2.googleapis.com/tokeninfo";
    static readonly SCOPE_EMAIL = "https://www.googleapis.com/auth/userinfo.email";
    static readonly SCOPE_PROFILE = "https://www.googleapis.com/auth/userinfo.profile";

    constructor(
        private readonly httpService: HttpService
    ) {}

    getOauth2Uri(dto: GoogleOauth2Dto) {
        const uri = new URL(GoogleService.API_OAUTH2);
        uri.searchParams.set("client_id", dto.clientId);
        uri.searchParams.set("redirect_uri", dto.redirectUri);
        uri.searchParams.set("response_type", dto.responseType);
        uri.searchParams.set("scope", dto.scopes.join(" "));
        if (dto.state) uri.searchParams.set("state", dto.state);
        return uri.toString();
    }

    async getToken(dto: GetTokenDto) {
        const data = new FormData();
        data.set("client_id", dto.clientId);
        data.set("client_secret", dto.clientSecret);
        data.set("code", dto.code);
        data.set("grant_type", dto.grantType);
        data.set("redirect_uri", dto.redirectUri);

        const response = await firstValueFrom(
            this.httpService.post<GoogleTokenResponseDto>(GoogleService.API_TOKEN, data).pipe(
                catchError((err: AxiosError) => {
                    console.log(err.response.data);
                    throw new GoogleGetTokenError()
                })
            )
        );

        return response.data;
    }

    async getTokenInfo(idToken: string) {
        const uri = new URL(GoogleService.API_TOKEN_INFO);
        uri.searchParams.set("id_token", idToken);
        const response = await firstValueFrom(
            this.httpService.get<GoogleTokeninfoResponseDto>(uri.toString()).pipe(
                catchError((err: AxiosError) => {
                    console.log(err.response.data);
                    throw new GoogleGetTokenInfoError()
                })
            )
        );
        return response.data;
    }
}