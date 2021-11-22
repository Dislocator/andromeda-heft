import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class WordsApiConnectionService {
  constructor(private httpService: HttpService) {}
  sendWord(word: string) {
    try {
      var options = {
        headers: {
          'x-rapidapi-host': process.env.X_RAPIDAPI_HOST,
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
        },
      };
      const res = firstValueFrom(
        this.httpService
          .get(`https://wordsapiv1.p.rapidapi.com/words/${word}`, options)
          .pipe(map((res) => res.data)),
      );
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
