import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordEntity } from '../entities/keyword.entity';
import { UserEntity } from '../entities/user.entity';
import { CategoryEntity } from '../entities/category.entity';
import { SentencePartEntity } from '../entities/sentencePart.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KeywordEntity,
      UserEntity,
      CategoryEntity,
      SentencePartEntity,
    ]), AuthModule
  ],
  providers: [KeywordsService],
  controllers: [KeywordsController]
})
export class KeywordsModule {}
