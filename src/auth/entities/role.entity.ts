import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user-role.entity";

@Entity({ name: "roles" })
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nom: string;

    @OneToMany(()=> UserRole, userrole => userrole.role)
    userRoles: UserRole[];

}