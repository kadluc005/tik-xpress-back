import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './entities/role.entity';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private roleService: RoleService,
    private readonly jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(createAuthDto.password, salt);
    const user = this.authRepository.create({
      ...createAuthDto,
      password: hash,
      is_active: true,
      is_visible: true,
      created_at: new Date(),
      updated_at: new Date(),
    })
    // createAuthDto.password = hash;

    // on sauvegarde l'utiliateur dans la base de données
    const savedUser = await this.authRepository.save(user);

    // on assigne le role orgnanisateur
    await this.roleService.assignRoleToUser(savedUser.id, 'client');

    return this.authRepository.findOne({
      where: { id: savedUser.id },
      relations: ['roles', 'roles.role'],
    })

  }

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user =  await this.authRepository.findOne({
      where: {email},
    });

    if(!user) return null;

    const isMached = await bcrypt.compare(password, user.password);
    if(!isMached) throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email }
    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }

  findAll(): Promise<Auth[]> {
    return this.authRepository.find();
  }

  findOne(id: number): Promise<Auth | null > {
    return this.authRepository.findOneBy({ id });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  findUserWithRoles(userId: number): Promise<Auth> {
    return this.authRepository.findOne({
      where: {id: userId},
      relations: ['roles', 'roles.role'],
    });
  }
}
