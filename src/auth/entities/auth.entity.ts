import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

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
    tel: string;

    @Column()
    password: string;

    @Column()
    type: string;

    @Column()
    is_active: boolean;

    @Column()
    is_visible: boolean;
    
    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

}
