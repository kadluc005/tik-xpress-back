import { ChildEntity, Column } from "typeorm";
import { Auth } from "./auth.entity";

@ChildEntity()
export class Organisateurs extends Auth {
    
    @Column()
    nom_entretrise;

    @Column()
    contact;

}