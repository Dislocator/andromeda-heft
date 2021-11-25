import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class DatamuseApiConnectionService {
  constructor(private httpService: HttpService) {}
  async sendData(options: string) {
    const res = firstValueFrom(
      this.httpService
        .get(`https://api.datamuse.com/words?${options}`)
        .pipe(map((res) => res.data)),
    );
    return res;
  }
  /* returns part of speech of given word
  n - noun, v - verb, adj - adjective */
  async getPartOfSpeech(word) {
    const options = `sp=${word}$md=p&max=1`
    const res = await this.sendData(options)
    const partOfSpeech = res.tags[0]
    return partOfSpeech
  }
}
