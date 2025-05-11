import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}
  create(createEventDto: CreateEventDto, userId: number) {

    const event = this.eventRepository.create({
      ...createEventDto,
      organisateur: {id: userId},
      is_active: true,
      is_visible: true,
      created_at: new Date(),
      updated_at: new Date(),
    })
    // console.log(event)
    return this.eventRepository.save(event);
  }

  findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  findOne(id: number): Promise<Event | null> {
    return this.eventRepository.findOneBy({ id });
  }

  async update(id: number, updateEventDto: UpdateEventDto, userId: number) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['organisateur'],
    });

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    if (event.organisateur.id !== userId) {
      throw new ForbiddenException("You are not allowed to update this event");
    }

    updateEventDto.updated_at = new Date();

    await this.eventRepository.update(id, updateEventDto);
    return this.eventRepository.findOneBy({ id });
  }

  async remove(id: number, userId: number) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['organisateur'],
    });

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    if (event.organisateur.id !== userId) {
      throw new ForbiddenException("You are not allowed to remove this event");
    }
    return this.eventRepository.delete(id);
  }
}
