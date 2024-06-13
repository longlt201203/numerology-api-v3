import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { ApiResponseDto, NumerologyClsStore } from "@utils";
import { AuthenticateResponseDto, GetLoginUriQuery } from "./dto";
import { SkipGuard } from "./skip-guard.decorator";
import { ClsService } from "nestjs-cls";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly cls: ClsService<NumerologyClsStore>,
    ) {}

    @Get("uri")
    @SkipGuard()
    getLoginUri(@Query() query: GetLoginUriQuery) {
        return new ApiResponseDto(this.authService.getLoginUri(query));
    }

    // @Get("sign-up-google")
    // @SkipGuard()
    // async signUpWithGoogle(@Query("code") code: string) {
    //     const [account, accessToken] = await this.authService.signUpWithGoogle(code);
    //     return new ApiResponseDto(AuthenticateResponseDto.from(account, accessToken));
    // }

    @Get("login-google")
    @SkipGuard()
    async loginWithGoogle(@Query("code") code: string) {
        const [account, accessToken] = await this.authService.loginWithGoogle(code);
        return new ApiResponseDto(AuthenticateResponseDto.from(account, accessToken));
    }

    @Get("profile")
    @ApiBearerAuth()
    async getProfile() {
        const profile = this.cls.get("profile");
        return new ApiResponseDto(profile);
    }
}