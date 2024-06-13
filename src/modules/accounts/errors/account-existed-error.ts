import { ApiError } from "@errors";

export class AccountExistedError extends ApiError {
    constructor() {
        super({
            code: "account_existed_err",
            message: "Account already existed",
            detail: null
        });
    }
}