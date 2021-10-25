import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { KeywordsService } from './keywords/keywords.service';

@Controller('user')
export class UserController {
  constructor(private keywordsService: KeywordsService) {}
  @Post('/keywords')
  @UseGuards(AuthGuard())
  async addKeywords(
    @User() user: UserEntity,
    @Body(ValidationPipe) keyword: KeywordDTO,
  ) {
    return this.keywordsService.addKeyword(user, keyword);
  }
}
