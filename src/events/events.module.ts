import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EventCreatedListener } from './event-created.listener';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventCreatedListener],
  imports: [
    TypeOrmModule.forFeature([Event]),
    AuthModule,
    MailModule,
    EventEmitterModule.forRoot()
  ],
})
export class EventsModule {}
