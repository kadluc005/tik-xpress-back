import { Auth } from "src/auth/entities/auth.entity";
import { Billet } from "src/type-billet/entities/billet.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "commandes" })
export class Commande {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Auth)
    utilisateur: Auth;

    @ManyToMany(()=> Billet, billet => billet.commande)
    billets: Billet[];

    @CreateDateColumn()
    date: Date;

    @Column()
    prix_total: number;

}
