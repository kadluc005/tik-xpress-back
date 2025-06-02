import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Auth } from "./auth.entity";
import { Role } from "./role.entity";

@Entity({ name: "user_roles" })
export class UserRole {

    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    roleId: number;

    @ManyToOne(() => Auth, user => user.roles, { onDelete: 'CASCADE' }) 
    @JoinColumn({ name: 'userId'})
    user: Auth

    @ManyToOne(()=> Role, role => role.userRoles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'roleId'})
    role: Role
}