import { CryptoModule } from "@modules/crypto";
import { Module } from "@nestjs/common";
import { GoogleModule } from "./modules/google";
import { AccountsModule } from "@modules/accounts";
import { ClsModule } from "nestjs-cls";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [ClsModule.forFeature(), GoogleModule, CryptoModule, AccountsModule],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}