import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../../entities/user.entity';
import { AuthPayload } from '../../models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: AuthPayload) {
    const { email } = payload;
    const user = this.userRepository.find({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
