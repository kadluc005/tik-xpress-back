import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { Auth } from 'src/auth/entities/auth.entity';
import { Role } from 'src/auth/entities/role.entity';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('/user/:id/role')
  async getUserRoles(@Param('id') userId: number): Promise<Role[]> {
      return this.roleService.getUserRoles(userId);
  }
  @Get('user/:id')
  async getUserWithRoles(@Param('id') userId: number): Promise<Auth>{
      return this.roleService.getUserWithRoles(userId)
  }

}
