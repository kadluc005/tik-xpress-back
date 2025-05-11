import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { RoleModule } from 'src/role/role.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [
    TypeOrmModule.forFeature([Auth]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30000s' },
      }),
    }),
    forwardRef(() => RoleModule), // Utilisé pour éviter les dépendances circulaires
  ],
  exports: [AuthGuard, JwtModule, AuthService]
})
export class AuthModule {}
