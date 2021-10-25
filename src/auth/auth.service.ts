import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO, RegisterDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterDTO) {
    try {
      const user = this.userRepository.create(credentials);
      user.save;
      const payload = { email: user.email };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJSON(), token } };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('username already taken');
      }
      throw new InternalServerErrorException('failed to register user');
    }
  }

  async login({ email, password }: LoginDTO) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      const isValid = await user.comparePassword(password);
      if (user && isValid) {
        const payload = { email: user.email };
        const token = this.jwtService.sign(payload);
        return { user: { ...user.toJSON(), token } };
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async findCurrentUser(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    const payload = { email: user.email };
    const token = this.jwtService.sign(payload);
    return { user: { ...user.toJSON(), token } };
  }
}
