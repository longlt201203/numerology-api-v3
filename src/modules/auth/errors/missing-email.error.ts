import { ApiError } from "@errors";

export class MissingEmailError extends ApiError {
    constructor() {
        super({
            code: "missing_email_err",
            message: "Email is missing",
            detail: null
        })
    }
}