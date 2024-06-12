import { NumerologyEntryDto } from "@modules/numerology/dto/numerology-entry.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class UpdateNumerologyEntryListDto {
    @ApiProperty({ type: NumerologyEntryDto, isArray: true })
    @Type(() => NumerologyEntryDto)
    @ValidateNested({ each: true })
    data: NumerologyEntryDto[];
}