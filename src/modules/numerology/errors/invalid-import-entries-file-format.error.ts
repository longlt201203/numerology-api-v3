import { ApiError } from "@errors";

export class InvalidImportEntriesFileFormatError extends ApiError {
    constructor() {
        super({
            code: "invalid_import_entries_file_format",
            message: "Invalid file format!",
            detail: null
        });
    }
}