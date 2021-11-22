import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { DatamuseApiConnectionService } from './datamuse-api-connection.service';

@Controller('datamuse-api-connection')
export class DatamuseApiConnectionController {
  constructor(
    private wordsApiConnectionService: DatamuseApiConnectionService,
  ) {}
  @Post()
  sendData(@Body('options', ValidationPipe) options: string) {
    const res = this.wordsApiConnectionService.sendData(options);
    return res;
  }
}
