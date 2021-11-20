import { HttpService } from '@nestjs/axios';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleDocsConnectionService } from './google-docs-connection.service';

@Controller('google-docs-connection')
export class GoogleDocsConnectionController {
    constructor(
        private googleDocsConnectionService: GoogleDocsConnectionService, 
        private httpService: HttpService,
        ){};
        
        @Get()
        async Dosomesing (){
         return this.googleDocsConnectionService.zalepa();
          
        }
        @Get('a')
        async Dosomesingwrong (){
        return this.googleDocsConnectionService.zalepaDrive();
          
        }
}













