import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { TypeBillet } from "./type-billet.entity";
import { Auth } from "src/auth/entities/auth.entity";
import { Commande } from "src/commande/entities/commande.entity";

@Entity({ name: "billets" })
export class Billet {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> TypeBillet, {eager: true})
    type: TypeBillet;

    @ManyToOne(()=> Commande, commande => commande.billets)
    commande: Commande;

    @Column()
    code: string;

    @Column()
    image_url: string;

    @Column({ default: false })
    estUtilise: boolean;

    // Générer un code unique de 6 caractères aléatoires
    static generateUniqueCode(id: number, longueurCode = 6){
        const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        const valeursAleatoires = new Uint32Array(longueurCode);
        
        // Utilisation de l'API crypto pour générer des valeurs aléatoires
        if(typeof window !== 'undefined' && window.crypto){
            window.crypto.getRandomValues(valeursAleatoires);
        }else {
            const crypto = require('crypto');
            crypto.randomFillSync(valeursAleatoires);
        }
        let code = '';
        for (let i = 0; i < longueurCode; i++) {
            code += caracteres[valeursAleatoires[i] % caracteres.length];
        }

        return `${code}-${id}`;
    }

}