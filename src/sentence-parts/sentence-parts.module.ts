import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SentencePartEntity } from 'src/entities/sentencePart.entity';
import { SentencePartsController } from './sentence-parts.controller';
import { SentencePartsService } from './sentence-parts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SentencePartEntity,
    ]), AuthModule
  ],
  controllers: [SentencePartsController],
  providers: [SentencePartsService]
})
export class SentencePartsModule {}
