import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordEntity } from 'src/entities/keyword.entity';
import { CategoryEntity } from 'src/entities/category.entity';
import { SentencePartEntity } from 'src/entities/sentencePart.entity';
import { SentencesService } from './sentences.service';
import { SentencesController } from './sentences.controller';
import { SentenceEntity } from 'src/entities/sentence.entity';
import { SentenceTemplateEntity } from 'src/entities/sentenceTemplate.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        KeywordEntity,
        UserEntity,
        SentenceTemplateEntity,
        CategoryEntity,
        SentencePartEntity,
        SentenceEntity,
    ]), AuthModule
  ],
  providers: [SentencesService],
  controllers: [SentencesController]
})
export class SentencesModule {}
