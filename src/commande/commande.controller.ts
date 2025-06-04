import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('commande')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCommandeDto: CreateCommandeDto, @Req() req) {
    const userId = req.user.sub
    return this.commandeService.create(createCommandeDto, userId);
  }

  @Get()
  findAll() {
    return this.commandeService.findAll();
  }

  @Get('user/:userid')
  findCommandeByUserId(@Param('userid') userid: string) {
    return this.commandeService.findCommandeByUserId(+userid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommandeDto: UpdateCommandeDto) {
    return this.commandeService.update(+id, updateCommandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandeService.remove(+id);
  }
}
