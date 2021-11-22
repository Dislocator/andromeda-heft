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
}
