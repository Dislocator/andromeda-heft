import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { KeywordEntity } from 'src/entities/keyword.entity';
import { LessonEntity } from 'src/entities/lesson.entity';
import { SentencePartEntity } from 'src/entities/sentencePart.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CreateLessonDTO, UpdateLessonDTO } from 'src/models/lesson.dto';
import { SentencePartDTO } from 'src/models/sentencePart.dto';
import { Repository } from 'typeorm';

@Injectable()
export class LessonsService {  constructor(
    @InjectRepository(KeywordEntity) private keywordsRepository: Repository<KeywordEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(SentencePartEntity) private sentencePartRepository: Repository<SentencePartEntity>,
    @InjectRepository(LessonEntity) private lessonRepository: Repository<LessonEntity>,
    
) {}
    async findAll(user: UserEntity) {
        const sentences = await this.userRepository.find({where: {id: user.id}, relations: ['lessons']})
        return sentences
    }

    async addLesson(data: CreateLessonDTO) {
        try {
            const lesson = await this.lessonRepository.create(data)        
            lesson.save()
            return lesson
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async updateLesson(data: UpdateLessonDTO, id: number) {
        try {
            const lesson = await this.lessonRepository.findOne({where: {id: id}})

        } catch (error) {
            
        }
    }

    async removeLesson(user: UserEntity, id: number) {
        try {
            const lessonToRemove = await this.userRepository.findOneOrFail({where: {id: id}, relations: ['lessons']})
            user.lessons.filter((lesson) => lesson.id !== lessonToRemove.id)
            return {lessons: user.lessons}
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
