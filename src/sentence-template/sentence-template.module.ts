import { Module } from '@nestjs/common';
import { SentenceTemplateController } from './sentence-template.controller';
import { SentenceTemplateService } from './sentence-template.service';

@Module({
  controllers: [SentenceTemplateController],
  providers: [SentenceTemplateService]
})
export class SentenceTemplateModule {}
