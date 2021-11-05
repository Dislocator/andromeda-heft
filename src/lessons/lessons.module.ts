import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryEntity } from 'src/entities/category.entity';
import { KeywordEntity } from 'src/entities/keyword.entity';
import { LessonEntity } from 'src/entities/lesson.entity';
import { SentencePartEntity } from 'src/entities/sentencePart.entity';
import { UserEntity } from 'src/entities/user.entity';
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
