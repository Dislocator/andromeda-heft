import { Module } from '@nestjs/common';
import { GoogleDocsConnectionController } from './google-docs-connection.controller';
import { GoogleDocsConnectionService } from './google-docs-connection.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
     AuthModule, HttpModule
  ],
  controllers: [GoogleDocsConnectionController],
  providers: [GoogleDocsConnectionService]
})
export class GoogleDocsConnectionModule {}
