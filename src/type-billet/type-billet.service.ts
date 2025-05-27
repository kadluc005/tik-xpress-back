import { Injectable } from '@nestjs/common';
import { CreateTypeBilletDto } from './dto/create-type-billet.dto';
import { UpdateTypeBilletDto } from './dto/update-type-billet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeBillet } from './entities/type-billet.entity';
import { Repository } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Billet } from './entities/billet.entity';
import { createCanvas, loadImage } from 'canvas';
import * as path from 'path';
import * as fs from 'fs';
import * as QRCode from 'qrcode';

@Injectable()
export class TypeBilletService {

  constructor(
    @InjectRepository(TypeBillet)
    private typeBilletRepository: Repository<TypeBillet>,
    @InjectRepository(Billet)
    private billetRepository: Repository<Billet>,
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

  async createBillet(billetData: Partial<Billet>): Promise<Billet>{

    if (!billetData.type || (typeof billetData.type === 'object' && !billetData.type.id)) {
      throw new Error("TypeBillet est requis pour générer un billet.");
    }

    const typeId = typeof billetData.type === 'object' ? billetData.type.id : billetData.type;
    let unique = false;
    let code = '';
    while (!unique) {
      code = Billet.generateUniqueCode(typeId);
      const existing = await this.billetRepository.findOne({ where: { code } });
      if (!existing) unique = true;
    }
    const billet = this.billetRepository.create({
      ...billetData,
      code: code,
      estUtilise: false,
    })

    const savedBillet = await this.billetRepository.save(billet);

    const imagePath = await this.generateBilletImage(code);
    savedBillet.image_url = imagePath;
    await this.billetRepository.save(savedBillet); // MAJ avec l'image

    return savedBillet;
  }

  async generateBilletImage(code: string): Promise<string> {
    const width = 600;
    const height = 300;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // fond blanc
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // titre
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Votre billet', 20, 40);

    // code du billet
    ctx.font = '20px Arial';
    ctx.fillText(`Code: ${code}`, 20, 80);

    // générer QR code
    const qrDataURL = await QRCode.toDataURL(code, { width: 150 });
    const qrImage = await loadImage(qrDataURL);
    ctx.drawImage(qrImage, width - 170, 50, 150, 150);

    // enregistrer l'image
    const outputPath = path.join(__dirname, `../../uploads/billets/${code}.png`);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    return `/uploads/billets/${code}.png`; // Pour accès via une URL publique
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
