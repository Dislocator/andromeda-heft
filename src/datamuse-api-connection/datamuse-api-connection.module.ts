import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatamuseApiConnectionController } from './datamuse-api-connection.controller';
import { DatamuseApiConnectionService } from './datamuse-api-connection.service';

@Module({
  imports: [HttpModule],
  controllers: [DatamuseApiConnectionController],
  providers: [DatamuseApiConnectionService],
  exports: [DatamuseApiConnectionService],
})
export class DatamuseApiConnectionModule {}
