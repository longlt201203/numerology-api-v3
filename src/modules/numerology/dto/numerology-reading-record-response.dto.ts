import { NumerologyReadingRecord } from "@entities";

export class NumerologyReadingRecordResponseDto {
    id: number;
    firstName: string;
    lsName: string;
    dob: Date;
    psychicNumber: number;
    destinyNumber: number;
    firstNameNumber: number;
    fullNameNumber: number;
    createdAt: Date;

    static fromEntity(entity: NumerologyReadingRecord): NumerologyReadingRecordResponseDto {
        return {
            id: entity.id,
            firstName: entity.firstName,
            lsName: entity.lsName,
            dob: entity.dob,
            psychicNumber: entity.psychicNumber,
            destinyNumber: entity.destinyNumber,
            firstNameNumber: entity.firstNameNumber,
            fullNameNumber: entity.fullNameNumber,
            createdAt: entity.createdAt
        };
    }

    static fromEntities(entities: NumerologyReadingRecord[]) {
        return entities.map(this.fromEntity);
    }
}