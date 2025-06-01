import { Event } from 'src/events/entities/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'type_billets' })
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
