import { Injectable } from '@nestjs/common';
import { CreateTypeBilletDto } from './dto/create-type-billet.dto';
import { UpdateTypeBilletDto } from './dto/update-type-billet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeBillet } from './entities/type-billet.entity';
import { Repository } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class TypeBilletService {

  constructor(
    @InjectRepository(TypeBillet)
    private typeBilletRepository: Repository<TypeBillet>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}
  
  async create(createTypeBilletDto: CreateTypeBilletDto) {
    const event =  await this.eventRepository.findOne({
      where: { id: createTypeBilletDto.eventId }
    })
    if (!event) {
      throw new Error('Event not found');
    } 
    const typeBillet = this.typeBilletRepository.create({
      ...createTypeBilletDto,
      event: event,
      is_active: true,
      is_visible: true,
      created_at: new Date(),
      updated_at: new Date(),
    })
    return await this.typeBilletRepository.save(typeBillet);
  }

  findAll() {
    return this.typeBilletRepository.find();
  }

  findEventBillets(eventId: number) {
    return this.typeBilletRepository.find({
      where: { event: { id: eventId } },
    });
  }

  findOne(id: number) {
    return this.typeBilletRepository.findOneBy({ id });
  }

  async update(id: number, updateTypeBilletDto: UpdateTypeBilletDto) {
    const typeBillet = await this.typeBilletRepository.findOneBy({ id })
    if (!typeBillet) {
      throw new Error('TypeBillet not found');
    }
    updateTypeBilletDto.updated_at = new Date();
    await this.typeBilletRepository.update(id, updateTypeBilletDto);
    return this.typeBilletRepository.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} typeBillet`;
  }
}
