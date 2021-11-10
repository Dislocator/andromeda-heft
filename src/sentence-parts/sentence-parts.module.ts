import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CategoryEntity } from '../entities/category.entity';
import { KeywordEntity } from '../entities/keyword.entity';
import { SentencePartEntity } from '../entities/sentencePart.entity';
import { UserEntity } from '../entities/user.entity';
import { SentencePartsController } from './sentence-parts.controller';
import { SentencePartsService } from './sentence-parts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SentencePartEntity,      KeywordEntity,
      UserEntity,
      CategoryEntity,
      SentencePartEntity,
    ]), AuthModule
  ],
  controllers: [SentencePartsController],
  providers: [SentencePartsService]
})
export class SentencePartsModule {}
