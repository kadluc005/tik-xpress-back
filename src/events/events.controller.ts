import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}


  @UseGuards(AuthGuard)
  @Roles('organisateur')
  @Post('create')
  create(@Body() createEventDto: CreateEventDto, @Req() req) {
    const userId = req.user.sub
    console.log(userId)
    // console.log(createEventDto)
    return this.eventsService.create(createEventDto, userId);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto, @Req() req) {

    const userId = req.user.sub;
    return this.eventsService.update(+id, updateEventDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req) {
    const userId = req.user.sub;
    return this.eventsService.remove(+id, userId);
  }
}
