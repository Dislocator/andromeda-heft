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

        // @Get()
        // async Dosomesing (){
        //  this.googleDocsConnectionService.connect();
          
        // }
}













