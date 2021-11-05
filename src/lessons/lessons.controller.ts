import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { CreateLessonDTO, UpdateLessonDTO } from 'src/models/lesson.dto';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
    constructor(private lessonsService: LessonsService){}

    @Get()
    @UseGuards(AuthGuard())
    async findAll(@User () user: UserEntity) {
        const lessons = await this.lessonsService.findAll(user);
        return lessons
    }

    @Post('add')
    @UseGuards(AuthGuard())
    async addLesson(@Body('lesson', ValidationPipe) data: CreateLessonDTO) {
        const lesson = await this.lessonsService.addLesson(data)
        return lesson
    }

    @Put(':/id')
    @UseGuards(AuthGuard())
    async editLesson(@Param('id') id: number, @Body('lesson', ValidationPipe) data: UpdateLessonDTO) {
        const lesson = await this.lessonsService.updateLesson(data, id)
        return lesson
    }
    @Delete(':id')
    @UseGuards(AuthGuard())
    async removeSentencePart(@User() user: UserEntity, @Param('id') id: number) {
        const lesson = await this.lessonsService.removeLesson(user, id)
        return lesson
    }
}
