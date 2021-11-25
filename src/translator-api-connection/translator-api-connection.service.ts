import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class TranslatorApiConnectionService {
  constructor(private httpService: HttpService) {}
  translate(word: string) {
    try {
      var options = {
        headers: {
          'x-rapidapi-host': process.env.TRANSLATOR_HOST,
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
        },
      };
      const data={
          q: word,
          source: "de",
          target: "en"
      }

      const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2'
      const result = firstValueFrom(
          this.httpService.post(url, data, options).pipe(map((res) => res.data)),
      )
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}