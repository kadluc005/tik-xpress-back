import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}


  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: 'uploads/events',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() *1e9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
      },
    }),
  }))
  @UseGuards(AuthGuard, RolesGuard)
  //@Roles('organisateur')
  @Post('create')
  async create(@Body() createEventDto: CreateEventDto, @Req() req, @UploadedFile() image?: Express.Multer.File) {
    const userId = req.user.sub;
    const image_url = `/uploads/events/${image.filename}`;
    // console.log(userId)
    // console.log(createEventDto)
    return await this.eventsService.create({...createEventDto, image_url}, userId);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('my-events')
  @UseGuards(AuthGuard)
  getOrganizerEvents(@Req() req) {
    const userId = Number(req.user?.sub);

    if (!userId || isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    //console.log(Number(userId))
    //console.log(userId)
    return this.eventsService.getOrganizerEvents(userId);

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
