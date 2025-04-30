import { Event } from "src/events/entities/event.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "type_billets"})
export class TypeBillet {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    libelle: string;

    @Column()
    prix: number;

    @Column({ length: 255 })
    privileges: string;

    @Column()
    quantite: number;

    @ManyToOne(() => Event, (event) => event.id)
    event: Event;

    @Column()
    is_active: boolean;

    @Column()
    is_visible: boolean;
    
    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

}
