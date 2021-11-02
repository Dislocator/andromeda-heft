import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { CreateKeywordDTO, UpdateKeywordDTO } from 'src/models/keyword.dto';
import { UpdateUserDTO } from 'src/models/user.model';
import { KeywordsService } from './keywords.service';
@Controller('keywords')
export class KeywordsController {
    constructor(
        private keywordsService: KeywordsService,
    ){}

    @Get()
    @UseGuards(AuthGuard())
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
        return res
    }
    
    @Put(':slug')
    @UseGuards(AuthGuard())
    async updateKeyword(@User() user: UserEntity, string, @Body('keyword') data: UpdateKeywordDTO) {
        const keyword = await this.keywordsService.updateKeyword(data, user)
        return keyword
    }

    @Delete(':slug')
    @UseGuards(AuthGuard())
    async deleteKeyword(@User() user: UserEntity, @Param() slug: string) {
        const keyword = await this.keywordsService.deleteKeyword(slug, user)
        return keyword
    }
} 
