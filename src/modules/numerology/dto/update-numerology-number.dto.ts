import { Type } from "class-transformer";
import { NumerologyEntryRequestDto } from "./numerology-entry-request.dto";
import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested } from "class-validator";

export class UpdateNumerologyNumberDto {
    @ApiProperty({ type: NumerologyEntryRequestDto, isArray: true })
    @Type(() => NumerologyEntryRequestDto)
    @ValidateNested({ each: true })
    entries: NumerologyEntryRequestDto[];
}