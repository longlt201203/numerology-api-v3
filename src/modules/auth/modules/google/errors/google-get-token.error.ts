import { ApiError } from "@errors";

export class GoogleGetTokenError extends ApiError {
    constructor() {
        super({
            code: "google_token_err",
            message: "Get Google Token Error",
            detail: null
        });
    }
}