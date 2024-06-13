import { Account } from "@entities";
import { CryptoService } from "@modules/crypto";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Env, RoleType } from "@utils";
import { Repository } from "typeorm";
import { AccountNotFoundError } from "./errors";

@Injectable()
export class AccountsService implements OnModuleInit {
    constructor(
        @InjectRepository(Account)
        private readonly accountsRepository: Repository<Account>,
        private readonly cryptoService: CryptoService
    ) {}

    onModuleInit() {
        this.createAdmin();
    }

    private async createAdmin() {
        const adminAccount = await this.accountsRepository.findOne({ where: { email: Env.ADMIN_EMAIL } });
        if (!adminAccount) {
            await this.accountsRepository.save({
                email: Env.ADMIN_EMAIL,
                password: await this.cryptoService.hashPassword(this.cryptoService.generateRandomPassword()),
                role: RoleType.ADMIN
            });
        }
    }

    async getOneById(id: string) {
        const account = await this.accountsRepository.findOne({ where: { id: id } });
        if (!account) throw new AccountNotFoundError();
        return account;
    }

    async getOneByEmailOrFail(email: string) {
        const account = await this.accountsRepository.findOne({ where: { email: email } });
        if (!account) throw new AccountNotFoundError();
        return account;
    }
}