import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommandeService {
  MailService: any;
  constructor(
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,
  ) {}
  async create(createCommandeDto: CreateCommandeDto, userId: number) {
    const commande = this.commandeRepository.create({
      utilisateur: {id: userId},
      ...createCommandeDto,
    })

    return this.commandeRepository.save(commande);
  }

  findAll() {
    return this.commandeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} commande`;
  }

  update(id: number, updateCommandeDto: UpdateCommandeDto) {
    return `This action updates a #${id} commande`;
  }

  remove(id: number) {
    return `This action removes a #${id} commande`;
  }
}
