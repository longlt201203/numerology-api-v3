import { ApiError } from "@errors";

export class NumerologyEntryNotFoundError extends ApiError {
    constructor() {
        super({ code: "numerology_entry_not_found", message: "Numerology Entry Not Found!", detail: null });
    }
}