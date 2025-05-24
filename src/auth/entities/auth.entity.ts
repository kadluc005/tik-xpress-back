import { Event } from "src/events/entities/event.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Role } from "./role.entity";
import { UserRole } from "./user-role.entity";

@Entity({ name: "users"})
@TableInheritance({column: {type: "varchar", name: "type"}})
export class Auth {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    nomEntreprise: string

    @Column()
    tel: string;

    @Column()
    password: string;

    @OneToMany(()=> UserRole, userrole => userrole.user)
    roles: UserRole[];

    @OneToMany(()=> Event, event => event.organisateur)
    events: Event[];


    @Column()
    is_active: boolean;

    @Column()
    is_visible: boolean;
    
    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

}
