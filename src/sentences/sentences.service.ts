import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { KeywordEntity } from 'src/entities/keyword.entity';
import { SentenceEntity } from 'src/entities/sentence.entity';
import { SentencePartEntity } from 'src/entities/sentencePart.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SentencesService {
    constructor(

        @InjectRepository(KeywordEntity) private keywordsRepository: Repository<KeywordEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
        @InjectRepository(SentencePartEntity) private sentencePartRepository: Repository<SentencePartEntity>,
        @InjectRepository(SentenceEntity) private sentenceRepository: Repository<SentenceEntity>,
    ){} 
    /* 
    returns a list of all sentences for the current user
    */   
    async findAll(user: UserEntity) {
        const sentences = await this.userRepository.find({where: {ide: user.id}, relations: ['sentences']})
        return sentences
    }

    async generateSentences(user) {
        try {
            
        } catch (error) {
            
        }
    }

    async generateSentence(user, keyword) {
        try {
            
        } catch (error) {
            
        }
    }
}
