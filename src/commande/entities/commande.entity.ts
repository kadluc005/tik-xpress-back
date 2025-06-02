import { Auth } from 'src/auth/entities/auth.entity';
import { Billet } from 'src/type-billet/entities/billet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'commandes' })
export class Commande {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Auth)
  utilisateur: Auth;

  @OneToMany(() => Billet, (billet) => billet.commande, { onDelete: 'CASCADE' })
  billets: Billet[];

  @CreateDateColumn()
  date: Date;

  @Column()
  prix_total: number;
}
