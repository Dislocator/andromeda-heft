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
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterDTO) {
    try {
      const user = await this.userRepository.create(credentials);
      await user.save();
      console.log(await this.userRepository.find(), "users");
      const payload = { email: user.email };
      const token = this.jwtService.sign(payload);
      return {...user.toJSON(), token };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('username already taken');
      }
      throw new InternalServerErrorException('failed to register user');
    }
  }

  async login({ email, password }: LoginDTO) {
    try {
      console.log(await this.userRepository.find(), "users");
      const user = await this.userRepository.findOne({ where: { email } });
      console.log(user)
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      } 
        
                const payload = { email: user.email };
                const token = this.jwtService.sign(payload);
                return { ...user.toJSON(), token };
      
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
