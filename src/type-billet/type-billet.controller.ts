import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TypeBilletService } from './type-billet.service';
import { CreateTypeBilletDto } from './dto/create-type-billet.dto';
import { UpdateTypeBilletDto } from './dto/update-type-billet.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Billet } from './entities/billet.entity';

@Controller('type-billet')
export class TypeBilletController {
  constructor(private readonly typeBilletService: TypeBilletService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTypeBilletDto: CreateTypeBilletDto) {
    return this.typeBilletService.create(createTypeBilletDto);
  }

  @UseGuards(AuthGuard)
  @Post('billet')
  createBillet(@Body() billetData: Partial<Billet>) {
    return this.typeBilletService.createBillet(billetData);
  }

  @Get()
  findAll() {
    return this.typeBilletService.findAll();
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
