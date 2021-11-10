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
        //  let zelupa =  this.googleDocsConnectionService.сlientAuth();
        //   return zelupa;
        // }
        
  

}


// @Get()
//   @UseGuards(AuthGuard())
//   async findCurrentUser(@User() {email}: UserEntity){
//     const user = await this.authService.findCurrentUser(email)
//     return user
//   }










