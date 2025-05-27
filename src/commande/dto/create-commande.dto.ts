import { Billet } from 'src/type-billet/entities/billet.entity';

export class CreateCommandeDto {
  billets: Billet[];

  date: Date;

  prix_total: number;
}
