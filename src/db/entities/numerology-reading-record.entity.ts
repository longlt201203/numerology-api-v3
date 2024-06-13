import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NumerologyReadingRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lsName: string;

    @Column()
    dob: Date;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    psychicNumber: number;

    @Column()
    destinyNumber: number;

    @Column()
    firstNameNumber: number;

    @Column()
    fullNameNumber: number;
}