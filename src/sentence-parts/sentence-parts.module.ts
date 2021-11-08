import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryEntity } from 'src/entities/category.entity';
import { KeywordEntity } from 'src/entities/keyword.entity';
import { SentencePartEntity } from 'src/entities/sentencePart.entity';
import { UserEntity } from 'src/entities/user.entity';
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
