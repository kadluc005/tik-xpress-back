import { Auth } from 'src/auth/entities/auth.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({type: 'text'})
  description: string;

  @Column()
  type: string;

  @Column()
  date_debut: Date;

  @Column()
  date_fin: Date;

  @Column()
  lieu: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  image_url: string;

  @ManyToOne(() => Auth, (auth) => auth.events, { onDelete: 'CASCADE' })
  organisateur: Auth;

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
