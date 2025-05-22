import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CommandeController],
  providers: [CommandeService],
  imports: [
    TypeOrmModule.forFeature([Commande]),
    AuthModule,
  ]

})
export class CommandeModule {}
