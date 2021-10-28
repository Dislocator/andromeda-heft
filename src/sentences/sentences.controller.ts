import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { CreateKeywordDTO } from 'src/models/keyword.dto';
import { SentencesService } from './sentences.service';

@Controller('sentences')
export class SentencesController {
    constructor(private sentencesService: SentencesService) {
    }
    /* 
    returns a list of all sentences for the current user
    */ 
    @Get()
    @UseGuards(AuthGuard())  
    async findAll(@User() user: UserEntity) {
        const sentences = await this.sentencesService.findAll();
        return sentences
    }

    @Get('/generate')
    @UseGuards(AuthGuard()) 
    async generateSentences(@User() user: UserEntity) {
        const sentences = await this.sentencesService.generateSentences(user)
        return sentences
    }

    @Post('/generate')
    @UseGuards(AuthGuard())
    async generateSentence(@User() user: UserEntity, @Body('keyword', ValidationPipe) keyword: string) {
        const sentence = await this.sentencesService.generateSentence(user, keyword)
        return sentence
    }
}
