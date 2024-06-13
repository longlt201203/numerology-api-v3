import { AccountsService } from "@modules/accounts";
import { CryptoService } from "@modules/crypto";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SkipGuard } from "./skip-guard.decorator";
import { Request } from "express";
import { ProfileDto } from "./dto";
import { ClsService } from "nestjs-cls";
import { NumerologyClsStore } from "@utils";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly cryptoService: CryptoService,
        private readonly accountsService: AccountsService,
        private readonly cls: ClsService<NumerologyClsStore>
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const isSkipGuardHandler = this.reflector.get(SkipGuard, context.getHandler());
            const isSkipGuardClass = this.reflector.get(SkipGuard, context.getClass());
            if (isSkipGuardHandler != undefined || isSkipGuardClass != undefined) return true;
            const request = context.switchToHttp().getRequest<Request>();
            const token = this.retrieveAccessToken(request);
            if (!token) return false;
            const accountId = this.cryptoService.verifyJwtToken(token);
            if (!accountId) return false;
            const account = await this.accountsService.getOneById(accountId);
            this.cls.set("profile", ProfileDto.fromAccount(account));
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    private retrieveAccessToken(request: Request) {
        let token = this.fromCookie(request);
        if (!token) token = this.fromAuthorizationHeader(request);
        return token;
    }
    
    private fromCookie(request: Request) {
        return request.cookies.accessToken || null;
    }

    private fromAuthorizationHeader(request: Request) {
        let token = null;
        const authorization = request.headers.authorization;
        if (authorization && authorization.startsWith("Bearer ")) {
            token = authorization.slice("Bearer ".length, authorization.length);
        }
        return token;
    }
}