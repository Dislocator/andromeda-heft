import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { map } from 'rxjs';
import { TranslatorApiConnectionService } from './translator-api-connection.service';

@Controller('translate')
export class TranslatorApiConnectionController {
  constructor(
    private translatorApiConnectionService: TranslatorApiConnectionService,
    private httpService: HttpService,
  ) {}
  @Post()
  async translate(@Body('word', ValidationPipe) word: string) {
    const res = this.translatorApiConnectionService.translate(word);
    return res;
  }
}
