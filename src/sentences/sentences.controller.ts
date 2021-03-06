import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { CreateKeywordDTO } from '../models/keyword.dto';
import { SentencesService } from './sentences.service';

@Controller('sentences')
export class SentencesController {
  constructor(private sentencesService: SentencesService) {}
  /* 
    returns a list of all sentences for the current user
    */
  @Get()
  @UseGuards(AuthGuard())
  async findAll(@User() user: UserEntity) {
    const sentences = await this.sentencesService.findAll(user);
    return sentences;
  }
  /* 
    generates sentence for all keywords from current user
    */
  @Get('/add')
  //   @UseGuards(AuthGuard())
  async generateSentences(@User() user: UserEntity) {
    return await this.sentencesService.createSentence();
    const word = 'program';
    const wordPart = 'noun';
    return await this.sentencesService.getNextWords(word, wordPart);
    const sentences = await this.sentencesService.generateSentences(user);
    return sentences;
  }

  @Post('/add')
  @UseGuards(AuthGuard())
  async generateSentence(
    @User() user: UserEntity,
    @Body('keyword', ValidationPipe) keyword: string,
  ) {
    const sentence = await this.sentencesService.generateSentence(
      user,
      keyword,
    );
    return sentence;
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateSentence(
    @Param('id') id: string,
    @User() user: UserEntity,
    @Body('sentence', ValidationPipe) sentence: string,
  ) {
    // TODO: implement updating. Either add edited string as simple sentence or split by words and search for them in DB. Afterwords add keywords to sentence.
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async removeSentence(@Param('id') id: string, @User() user: UserEntity) {
    const sentence = await this.sentencesService.removeSentence(id, user);
  }
}
