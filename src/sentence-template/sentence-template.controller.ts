import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SentenceTemplateDTO } from 'src/models/sentenceTemplate.dto';
import { SentenceTemplateService } from './sentence-template.service';

@Controller('sentence-template')
export class SentenceTemplateController {
    constructor(private sentenceTemplateService: SentenceTemplateService){}
    //TODO: Add so that only admin cann access this controllers endpoints
    @Get()
    // @UseGuards(AuthGuard())
    async findAll() {
        const sentenceTemplates = await this.sentenceTemplateService.findAll();
        return sentenceTemplates
    }

    @Post('add')
    // @UseGuards(AuthGuard())
    async addSentencePart(@Body('sentence-template', ValidationPipe) data: SentenceTemplateDTO ) {
        const sentenceTemplate = await this.sentenceTemplateService.addSentenceTemplate(data)
        return sentenceTemplate
    }

    @Delete('remove/:id')
    @UseGuards(AuthGuard())
    async removeSentencePart(@Param('id') id: number) {
        const sentencePart = await this.sentenceTemplateService.removeSentenceTemplate(id)
        return sentencePart
    }
}
