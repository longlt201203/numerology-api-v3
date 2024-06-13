import { ApiProperty } from "@nestjs/swagger";

export class ImportEntriesDto {
    @ApiProperty({ type: "string", format: "binary" })
    file: any;
}