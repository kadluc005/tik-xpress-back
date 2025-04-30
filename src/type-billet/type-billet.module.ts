import { Module } from '@nestjs/common';
import { TypeBilletService } from './type-billet.service';
import { TypeBilletController } from './type-billet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeBillet } from './entities/type-billet.entity';
import { Event } from 'src/events/entities/event.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TypeBilletController],
  providers: [TypeBilletService],
  imports: [
    TypeOrmModule.forFeature([TypeBillet]),
    TypeOrmModule.forFeature([Event]),
    AuthModule,
  ],
})
export class TypeBilletModule {}
