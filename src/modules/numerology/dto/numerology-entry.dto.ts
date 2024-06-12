import { NumerologyEntry } from "@entities";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class NumerologyEntryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    id?: number;

    @ApiProperty()
    @IsNumber()
    number: number;

    @ApiProperty()
    @IsString()
    psychicDescription: string;

    @ApiProperty()
    @IsString()
    destinyDescription: string;

    @ApiProperty()
    @IsString()
    nameDescription: string;

    static fromEntity(entity: NumerologyEntry): NumerologyEntryDto {
        return {
            id: entity.id,
            number: entity.number,
            psychicDescription: entity.psychicDescription,
            destinyDescription: entity.destinyDescription,
            nameDescription: entity.nameDescription
        }
    }

    static fromEntities(entities: NumerologyEntry[]) {
        return entities.map(this.fromEntity);
    }
}