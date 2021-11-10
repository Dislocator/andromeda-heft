import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { CategoryEntity } from '../entities/category.entity';
import { KeywordEntity } from '../entities/keyword.entity';
import { SentenceEntity } from '../entities/sentence.entity';
import { SentencePartEntity } from '../entities/sentencePart.entity';
import { UserEntity } from '../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        KeywordEntity,
        UserEntity,
        CategoryEntity,
        SentencePartEntity,
        SentenceEntity
    ]), AuthModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
