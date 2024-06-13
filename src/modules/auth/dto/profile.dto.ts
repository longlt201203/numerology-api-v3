import { Account } from "@entities";

export class ProfileDto {
    id: string;
    email: string;

    static fromAccount(account: Account): ProfileDto {
        return {
            id: account.id,
            email: account.email
        }
    }
}