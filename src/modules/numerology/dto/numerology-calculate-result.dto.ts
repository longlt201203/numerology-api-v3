import { ApiProperty } from "@nestjs/swagger";

export class NumerologyCalculateResultDto {
    @ApiProperty()
    psychicNumber: number;

    @ApiProperty()
    psychicDescription: string;

    @ApiProperty()
    destinyNumber: number;

    @ApiProperty()
    destinyDescription: string;

    @ApiProperty()
    firstNameNumber: number;

    @ApiProperty()
    firstNameDescription: string;

    @ApiProperty()
    fullNameNumber: number;

    @ApiProperty()
    fullNameDescription: string;
}