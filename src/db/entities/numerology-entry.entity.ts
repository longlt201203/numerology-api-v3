import { NumerologyEntryTypeEnum } from "@utils";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NumerologyEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: NumerologyEntryTypeEnum })
    type: NumerologyEntryTypeEnum;

    @Column()
    number: number;

    @Column({ type: "text" })
    description: string;
}