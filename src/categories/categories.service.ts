import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { KeywordEntity } from '../entities/keyword.entity';
import { SentencePartEntity } from '../entities/sentencePart.entity';
import { UserEntity } from '../entities/user.entity';
import { CategoryDTO } from '../models/category.dto';
import { SentencePartDTO } from '../models/sentencePart.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
) {}
async findAll() {
    const sentenceParts = await this.categoryRepository.find()
    return sentenceParts
}

async addSentencePart(data: CategoryDTO) {
    try {
        const sentencePart = await this.categoryRepository.create(data)        
        sentencePart.save()
        return sentencePart
    } catch (error) {
        throw new InternalServerErrorException(error)
    }
}

async removeSentencePart(id: number) {
    try {
        const sentencePart = await this.categoryRepository.findOneOrFail(id)
        sentencePart.remove()
        return sentencePart
        
    } catch (error) {
        throw new InternalServerErrorException(error)
    }
}

}
