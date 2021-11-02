import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SentencePartDTO } from 'src/models/sentencePart.dto';
import { SentencePartsService } from './sentence-parts.service';

@Controller('sentence-parts')
export class SentencePartsController {
    constructor(private sentencePartsService: SentencePartsService){}

    @Get()
    @UseGuards(AuthGuard())
    async findAll() {
        const sentenceParts = await this.sentencePartsService.findAll();
        return sentenceParts
    }

    @Post('add')
    @UseGuards(AuthGuard())
    async addSentencePart(@Body('sentence-part', ValidationPipe) data: SentencePartDTO) {
        const sentencePart = await this.sentencePartsService.addSentencePart(data)
        return sentencePart
    }

    @Delete('remove/:id')
    @UseGuards(AuthGuard())
    async removeSentencePart(@Param('id') id: number) {
        const sentencePart = await this.sentencePartsService.removeSentencePart(id)
        return sentencePart
    }
}
