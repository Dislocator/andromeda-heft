import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryEntity } from 'src/entities/category.entity';
import { KeywordEntity } from 'src/entities/keyword.entity';
import { SentenceEntity } from 'src/entities/sentence.entity';
import { SentencePartEntity } from 'src/entities/sentencePart.entity';
import { UserEntity } from 'src/entities/user.entity';
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
