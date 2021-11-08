import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { map } from 'rxjs';
import { WordsApiConnectionService } from './words-api-connection.service';

@Controller('words-api-connection')
export class WordsApiConnectionController {
    constructor(
        private wordsApiConnectionService: WordsApiConnectionService, 
        private httpService: HttpService,
        ){}
        @Post()
        sendWord(@Body('word', ValidationPipe) word: string) {
            var options = {          
                headers: {
                  'x-rapidapi-host': process.env.X_RAPIDAPI_HOST,
                  'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
                }
              };
              console.log(process.env.X_RAPIDAPI_HOST)
            const res = this.httpService.get(`https://wordsapiv1.p.rapidapi.com/words/${word}`, 
            options).pipe(map(res => res.data))
            return res
        }
}
