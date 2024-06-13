import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NumerologyEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    number: number;

    @Column({ type: "text" })
    psychicDescription: string;

    @Column({ type: "text" })
    destinyDescription: string;

    @Column({ type: "text" })
    nameDescription: string;

    @Column({ type: "text" })
    yearDescription: string;
}