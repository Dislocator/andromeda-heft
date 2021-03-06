import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SentencePartEntity } from '../entities/sentencePart.entity';
import { SentenceTemplateEntity } from '../entities/sentenceTemplate.entity';
import { SentenceTemplateController } from './sentence-template.controller';
import { SentenceTemplateService } from './sentence-template.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SentenceTemplateEntity,
      SentencePartEntity
    ]), AuthModule
  ],
  controllers: [SentenceTemplateController],
  providers: [SentenceTemplateService]
})
export class SentenceTemplateModule {}
