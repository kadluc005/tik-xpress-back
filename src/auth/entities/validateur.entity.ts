import { ChildEntity, Column } from "typeorm";
import { Auth } from "./auth.entity";

@ChildEntity()
export class Validateur extends Auth {

    @Column()
    is_validated: boolean;

}