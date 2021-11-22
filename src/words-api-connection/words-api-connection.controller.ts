import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { map } from 'rxjs';
import { WordsApiConnectionService } from './words-api-connection.service';

@Controller('words-api-connection')
export class WordsApiConnectionController {
  constructor(
    private wordsApiConnectionService: WordsApiConnectionService,
    private httpService: HttpService,
  ) {}
  @Post()
  async sendWord(@Body('word', ValidationPipe) word: string) {
    const res = this.wordsApiConnectionService.sendWord(word);
    return res;
  }
}
