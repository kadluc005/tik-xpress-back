import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { TypeBilletService } from './type-billet.service';
import { CreateTypeBilletDto } from './dto/create-type-billet.dto';
import { UpdateTypeBilletDto } from './dto/update-type-billet.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Billet } from './entities/billet.entity';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';

@Controller('type-billet')
export class TypeBilletController {
  constructor(private readonly typeBilletService: TypeBilletService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  //@Roles('organisateur')
  create(@Body() createTypeBilletDto: CreateTypeBilletDto) {
    return this.typeBilletService.create(createTypeBilletDto);
  }

  @UseGuards(AuthGuard)
  @Post('billet')
  createBillet(@Body() body: { billetData: Partial<Billet>, email: string }) {
    const { billetData, email } = body;
    return this.typeBilletService.createBillet(billetData, email);
  }

  @Get()
  findAll() {
    return this.typeBilletService.findAll();
  }

  //@UseGuards(AuthGuard)
  @Get(':code')
  async findBilletByCode(@Param('code') code: string) {
    const billet = await this.typeBilletService.findBilletByCode(code);
    if (!billet) {
      throw new NotFoundException(`Aucun billet trouvé avec le code : ${code}`);
    }
    return billet;
  }

  @Patch('validate/:code')
  async validateBillet(@Param('code') code: string) {
    return await this.typeBilletService.validateBillet(code);
  }

  @Get('event/:id')
  findEventBillets(@Param('id') id: string) {
    return this.typeBilletService.findEventBillets(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeBilletService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeBilletDto: UpdateTypeBilletDto,
  ) {
    return this.typeBilletService.update(+id, updateTypeBilletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeBilletService.remove(+id);
  }
}
