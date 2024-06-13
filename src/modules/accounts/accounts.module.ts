import { Module } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "@entities";
import { CryptoModule } from "@modules/crypto";

@Module({
    imports: [TypeOrmModule.forFeature([Account]), CryptoModule],
    providers: [AccountsService],
    exports: [AccountsService]
})
export class AccountsModule {}