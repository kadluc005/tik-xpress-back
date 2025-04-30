import { Auth } from "src/auth/entities/auth.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: "events" })
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column()
    date_debut: Date;

    @Column()
    date_fin: Date;

    @Column()
    lieu: string;

    @Column()
    image_url: string;

    @ManyToOne(()=> Auth, auth => auth.id)
    organisateur: Auth;

    @Column()
    is_active: boolean;

    @Column()
    is_visible: boolean;
    
    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
