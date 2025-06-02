import { Event } from 'src/events/entities/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'type_billets' })
export class TypeBillet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  libelle: string;

  @Column({ default:0 })
  prix: number;

  @Column({ length: 255, nullable: true })
  privileges: string;

  @Column({ default: 0})
  quantite: number;

  @Column({ default: 0 })
  quantiteRestante: number;

  @ManyToOne(() => Event, (event) => event.id, { onDelete: 'CASCADE' })
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
