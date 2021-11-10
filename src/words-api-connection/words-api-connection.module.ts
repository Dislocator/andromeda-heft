import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CategoryEntity } from '../entities/category.entity';
import { KeywordEntity } from '../entities/keyword.entity';
import { SentenceEntity } from '../entities/sentence.entity';
import { SentencePartEntity } from '../entities/sentencePart.entity';
import { UserEntity } from '../entities/user.entity';
import { WordsApiConnectionController } from './words-api-connection.controller';
import { WordsApiConnectionService } from './words-api-connection.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        KeywordEntity,
        UserEntity,
        CategoryEntity,
        SentencePartEntity,
        SentenceEntity
    ]), AuthModule, HttpModule
  ],
  controllers: [WordsApiConnectionController],
  providers: [WordsApiConnectionService]
})
export class WordsApiConnectionModule {}
