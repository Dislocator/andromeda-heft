import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordEntity } from '../entities/keyword.entity';
import { UserEntity } from '../entities/user.entity';
import { CategoryEntity } from '../entities/category.entity';
import { SentencePartEntity } from '../entities/sentencePart.entity';
import { SentencesService } from './sentences.service';
import { SentencesController } from './sentences.controller';
import { SentenceEntity } from '../entities/sentence.entity';
import { SentenceTemplateEntity } from '../entities/sentenceTemplate.entity';
import { AuthModule } from '../auth/auth.module';
import { DatamuseApiConnectionModule } from 'src/datamuse-api-connection/datamuse-api-connection.module';
import { WordsApiConnectionModule } from 'src/words-api-connection/words-api-connection.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KeywordEntity,
      UserEntity,
      SentenceTemplateEntity,
      CategoryEntity,
      SentencePartEntity,
      SentenceEntity,
    ]),
    AuthModule,
    DatamuseApiConnectionModule,
    WordsApiConnectionModule,
  ],
  providers: [SentencesService],
  controllers: [SentencesController],
})
export class SentencesModule {}
