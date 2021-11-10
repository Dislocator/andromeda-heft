import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CategoryEntity } from '../entities/category.entity';
import { KeywordEntity } from '../entities/keyword.entity';
import { LessonEntity } from '../entities/lesson.entity';
import { SentencePartEntity } from '../entities/sentencePart.entity';
import { UserEntity } from '../entities/user.entity';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KeywordEntity,
      UserEntity,
      CategoryEntity,
      SentencePartEntity,
      LessonEntity
    ]), AuthModule
  ],
  controllers: [LessonsController],
  providers: [LessonsService]
})
export class LessonsModule {}
