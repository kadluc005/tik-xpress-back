import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/auth/entities/role.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserRole } from 'src/auth/entities/user-role.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
  imports: [
    TypeOrmModule.forFeature([Role, Auth, UserRole]),
    forwardRef(() => AuthModule), // Utilisé pour éviter les dépendances circulaires

  ],
})
export class RoleModule {}
