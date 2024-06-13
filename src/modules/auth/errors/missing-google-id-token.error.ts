import { ApiError } from "@errors";

export class MissingGoogleIdTokenError extends ApiError {
    constructor() {
        super({
            code: "missing_google_id_token_err",
            message: "Missing Google ID Token",
            detail: null
        });
    }
}