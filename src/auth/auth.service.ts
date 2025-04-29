import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(createAuthDto.password, salt);
    createAuthDto.password = hash;
    return this.authRepository.save(createAuthDto);
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
}
