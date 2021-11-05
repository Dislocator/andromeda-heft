import { Module } from '@nestjs/common';
import { GoogleDocsConnectionController } from './google-docs-connection.controller';
import { GoogleDocsConnectionService } from './google-docs-connection.service';

@Module({
  controllers: [GoogleDocsConnectionController],
  providers: [GoogleDocsConnectionService]
})
export class GoogleDocsConnectionModule {}
