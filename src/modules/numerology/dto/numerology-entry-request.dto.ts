import { ApiProperty } from "@nestjs/swagger";
import { NumerologyEntryTypeEnum } from "@utils";
import { IsEnum, IsNumber } from "class-validator";

export class NumerologyEntryRequestDto {
    @ApiProperty()
    @IsNumber()
    number: number;

    @ApiProperty({ enum: NumerologyEntryTypeEnum })
    @IsEnum(NumerologyEntryTypeEnum)
    type: NumerologyEntryTypeEnum;
}