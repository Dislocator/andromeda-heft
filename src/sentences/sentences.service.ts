import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { KeywordEntity } from 'src/entities/keyword.entity';
import { SentenceEntity } from 'src/entities/sentence.entity';
import { SentencePartEntity } from 'src/entities/sentencePart.entity';
import { SentenceTemplateEntity } from 'src/entities/sentenceTemplate.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SentencesService {
    constructor(
        @InjectRepository(KeywordEntity) private keywordsRepository: Repository<KeywordEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(SentenceTemplateEntity) private sentenceTemplateRepository: Repository<SentenceTemplateEntity>,     
        @InjectRepository(SentenceEntity) private sentenceRepository: Repository<SentenceEntity>,    
    ){} 
    /* 
    returns a list of all sentences for the current user
    */   
    async findAll(user: UserEntity) {
        const sentences = await this.userRepository.find({where: {ide: user.id}, relations: ['sentences']})
        return sentences
    }

    async generateSentences(user: UserEntity) {
        try {
            console.log("user",user)
            const keywords = user.keywords
            let sentence : SentenceEntity
            this.sentenceRepository.create(sentence)
            for (const keyword of keywords) {                
                this.generateSentenceHelper(user, keyword)
            }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
        return user.sentences
    }

    async generateSentence(user: UserEntity, keywordName: string) {
        try {
            const keyword = await this.keywordsRepository.findOne({where: { word: keywordName}})
            return this.generateSentenceHelper(user, keyword)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
    private async generateSentenceHelper(user: UserEntity, keyword: KeywordEntity) {
        let sentence : SentenceEntity
        const templates = (await this.sentenceTemplateRepository.find())
                const filteredTemplates = templates.filter((sentence) => sentence.sentenceParts.map((sentencePart) => sentencePart.name === keyword.sentencePart.name))
                const randomTemplate = filteredTemplates[Math.floor(Math.random() * filteredTemplates.length)]
                let foundSame = false
                for(const sentencePart of randomTemplate.sentenceParts) {
                    if ( sentencePart.name === keyword.sentencePart.name) {
                        foundSame = true
                    }
                    const keywords = await this.keywordsRepository.find({where: {sentencePart: sentencePart}}) 
                    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)]  
                    sentence.keywords.push(randomKeyword)
                }
                sentence.category = keyword.category
                user.sentences.push(sentence)

                user.save()
                sentence.save()

                return sentence
    }

    async removeSentence(id: string, user: UserEntity) {
        user.sentences.filter((sentence) => sentence.id != Number(id))
        return user.sentences
    }
}