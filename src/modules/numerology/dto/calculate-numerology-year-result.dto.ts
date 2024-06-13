import { ApiProperty } from "@nestjs/swagger";

export class CalculateNumerologyYearResultDto {
    @ApiProperty()
    yearNumber: number;

    @ApiProperty()
    yearDescription: string;
}