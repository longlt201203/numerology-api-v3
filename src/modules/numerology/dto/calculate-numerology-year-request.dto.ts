import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber } from "class-validator";

export class CalculateNumerologyYearRequestDto {
    @ApiProperty({ type: Date })
    @IsDateString()
    dob: string;

    @ApiProperty()
    @IsNumber()
    year: number;
}