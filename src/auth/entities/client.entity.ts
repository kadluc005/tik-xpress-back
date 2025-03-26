import { ChildEntity } from "typeorm";
import { Auth } from "./auth.entity";

@ChildEntity()
export class Client extends Auth {
    
}