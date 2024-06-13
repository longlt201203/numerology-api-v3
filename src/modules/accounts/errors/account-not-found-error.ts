import { ApiError } from "@errors";

export class AccountNotFoundError extends ApiError {
    constructor() {
        super({
            code: "account_not_found",
            message: "Account Not Found",
            detail: null
        })
    }
}