import { ApiError } from "@errors";

export class GoogleGetTokenInfoError extends ApiError {
    constructor() {
        super({
            code: "google_get_token_info_err",
            message: "Google Get Token Info Error",
            detail: null
        });
    }
}