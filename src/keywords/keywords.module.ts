import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordEntity } from 'src/entities/keyword.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CategoryEntity } from 'src/entities/category.entity';
import { SentencePartEntity } from 'src/entities/sentencePart.entity';
import { AuthModule } from 'src/auth/auth.module';

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
