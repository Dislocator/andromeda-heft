import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OptionalAuthGuard } from 'src/auth/optional-auth.guard';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDTO } from 'src/models/user.model';
import { KeywordsService } from 'src/user/keywords/keywords.service';

@Controller('keywords')
export class KeywordsController {
    constructor(
        private keywordsService: KeywordsService,
    ){}

    @Get()
    @UseGuards(new OptionalAuthGuard())
    async findAll(
        @User() user: UserEntity,
    ){
        const keywords = await this.keywordsService.findAll(user);
        return keywords
    }

    @Post('/add')
    @UseGuards(AuthGuard())
    async addKeyword(@User() user: UserEntity, @Body('keyword', ValidationPipe) data: CreateKeywordDTO) {
        const keyword = await this.keywordsService.addKeyword(user, data)
        return keyword
    }

    @Post('find')
    @UseGuards(AuthGuard())
    async findKeyword(@Body('keyword', ValidationPipe) data: string) {
        const res = await this.keywordsService.findKeyword(data) // if not found, returns error. If found, returns keyword
    }
    
    @Put(':slug')
    @UseGuards(AuthGuard())
    async updateKeyword(@User() user: UserEntity, @Param() slug: string) {
        const keyword = await this.keywordsService.updateKeyword(slug, user)
    }

    @Delete(':slug')
    @UseGuards(AuthGuard())
    async deleteKeyword(@User() user: UserEntity, @Param() slug: string) {
        const keyword = await this.keywordsService.deleteKeyword(slug, user)
    }
} 
