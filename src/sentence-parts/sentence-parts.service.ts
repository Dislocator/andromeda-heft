import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { KeywordEntity } from '../entities/keyword.entity';
import { SentencePartEntity } from '../entities/sentencePart.entity';
import { UserEntity } from '../entities/user.entity';
import { SentencePartDTO } from '../models/sentencePart.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SentencePartsService {  constructor(
    @InjectRepository(KeywordEntity) private keywordsRepository: Repository<KeywordEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(SentencePartEntity) private sentencePartRepository: Repository<SentencePartEntity>,
) {}
async findAll() {
    const sentenceParts = await this.sentencePartRepository.find()
    return sentenceParts
}

async addSentencePart(data: SentencePartDTO) {
    try {
        const sentencePart = await this.sentencePartRepository.create(data)        
        await sentencePart.save()
        return sentencePart
    } catch (error) {
        throw new InternalServerErrorException(error)
    }
}

async removeSentencePart(id: number) {
    try {
        const sentencePart = await this.sentencePartRepository.findOneOrFail(id)
        sentencePart.remove()
        return sentencePart
        
    } catch (error) {
        throw new InternalServerErrorException(error)
    }
}

}
