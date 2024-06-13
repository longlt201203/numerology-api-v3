import { RoleType } from "@utils";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "enum", enum: RoleType, default: RoleType.USER })
    role: RoleType;

    @Column({ unique: true })
    email: string;

    @Column({ type: "text" })
    password: string;

    @CreateDateColumn()
    createdAt: Date;
}