import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TranslatorApiConnectionController } from './translator-api-connection.controller';
import { TranslatorApiConnectionService } from './translator-api-connection.service';

@Module({
  imports: [HttpModule,AuthModule],
  controllers: [TranslatorApiConnectionController],
  providers: [TranslatorApiConnectionService],
  exports: [
    TranslatorApiConnectionService
  ]
})
export class TranslatorApiConnectionModule {}
