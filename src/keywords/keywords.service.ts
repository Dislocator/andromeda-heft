import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories, CategoryEntity } from 'src/entities/category.entity';
import { KeywordEntity } from 'src/entities/keyword.entity';
import { SentencePartEntity } from 'src/entities/sentencePart.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CreateKeywordDTO, UpdateKeywordDTO } from 'src/models/keyword.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { KeywordsModule } from './keywords.module';

@Injectable()
export class KeywordsService {
    constructor(
    @InjectRepository(KeywordEntity) private keywordsRepository: Repository<KeywordEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>
    @InjectRepository(SentencePartEntity) private sentencePartRepository: Repository<SentencePartEntity>
) {}
    async findAll(user: UserEntity) {
        const keywords = await this.userRepository.find({where: {id: user.id}, relations: ['keywords']})
        return keywords
    }

    async addKeyword(user: UserEntity, data:CreateKeywordDTO) {
        const keyword = await this.keywordsRepository.create({word: data.word.toLowerCase()})
        
        const category = await this.categoryRepository.findOne({where: {name: data.category}})
        if (category === undefined) {
            throw new NotFoundException("Category not found")
        }
        keyword.category = category
        
        const sentencePart = await this.sentencePartRepository.findOne({where: {name: data.sentencePart}})
        if (sentencePart === undefined) {
            throw new NotFoundException("SentencePart not found")

        }
        
        keyword.sentencePart = sentencePart
        user.keywords.push(keyword)
        user.save()
        keyword.save()

        return keyword
    }

    async findKeyword(data: string) {
        const keyword = await this.keywordsRepository.findOne({
            where:  {word: data.toLowerCase()}
        })

        if (keyword === undefined) {
            throw new NotFoundException("SentencePart not found")
        }
        return keyword
    }

    async updateKeyword(data: UpdateKeywordDTO, user: UserEntity) {
        //Only option to delete and recreate because category/sentence part can change? 
    }

    async deleteKeyword(data: string, user: UserEntity) {
        const keyword = await this.keywordsRepository.findOne({where: {word: data.toLowerCase()}})
        if (keyword === undefined) {
            throw new NotFoundException("Keyword not found")
        }
        const index = user.keywords.indexOf(keyword)
        if (index !== -1) {
            user.keywords.splice(index, 1)
        }
        user.save()
        return keyword
    }
}
