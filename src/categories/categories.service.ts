import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { KeywordEntity } from 'src/entities/keyword.entity';
import { SentencePartEntity } from 'src/entities/sentencePart.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CategoryDTO } from 'src/models/category.dto';
import { SentencePartDTO } from 'src/models/sentencePart.dto';
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
