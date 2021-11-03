import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryDTO } from 'src/models/category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService){}
    //TODO: Add so that only admin cann access this controllers endpoints
    @Get()
    @UseGuards(AuthGuard())
    async findAll() {
        const categories = await this.categoriesService.findAll();
        return categories
    }

    @Post('add')
    @UseGuards(AuthGuard())
    async addSentencePart(@Body('category', ValidationPipe) data: CategoryDTO) {
        const category = await this.categoriesService.addSentencePart(data)
        return category
    }

    @Delete('remove/:id')
    @UseGuards(AuthGuard())
    async removeSentencePart(@Param('id') id: number) {
        const category = await this.categoriesService.removeSentencePart(id)
        return category
    }
}
