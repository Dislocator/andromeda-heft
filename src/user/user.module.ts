import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { KeywordsService } from './keywords/keywords.service';

@Module({
  controllers: [UserController],
  providers: [UserService, KeywordsService]
})
export class UserModule {}
