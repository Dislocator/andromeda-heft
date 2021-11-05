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
        const sentences = await this.userRepository.find({where: {id: user.id}, relations: ['sentences']})
        return sentences
    }

    async generateSentences(user: UserEntity) {
        try {
            console.log("user",user)
            const keywords = user.keywords
            let sentence : SentenceEntity
            this.sentenceRepository.create(sentence)
            for (const keyword of keywords) {                
                await this.generateSentenceHelper(user, keyword)
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
        let sentence = this.sentenceRepository.create()
        sentence.keywords = []
        const templates = (await this.sentenceTemplateRepository.find())
        console.log(templates, 'templates')
        const filteredTemplates : SentenceTemplateEntity[] = []
        for (const template of templates) {
            for (const sentencePart of template.sentenceParts) {
                if (sentencePart.name === keyword.sentencePart.name) {
                    filteredTemplates.push(template)
                    break
                }
            }
        }
        console.log(filteredTemplates, "----------------------------------------------------------------")
        // const filteredTemplates = templates.filter((sentence) => sentence.sentenceParts.map((sentencePart) => sentencePart.name === keyword.sentencePart.name))
                const randomTemplate = filteredTemplates[Math.floor(Math.random() * filteredTemplates.length)]

                console.log(randomTemplate, 'template')
                let foundSame = false
                for(const sentencePart of randomTemplate.sentenceParts) {
                    if ( sentencePart.name === keyword.sentencePart.name && !foundSame) {
                        foundSame = true
                        sentence.keywords.push(keyword)
                        continue
                    }
                    const keywords = await this.keywordsRepository.find({where: {sentencePart: sentencePart}}) 
                    console.log(keywords, 'keywords', sentencePart, "sentencePart")
                    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)]  
                    sentence.keywords.push(randomKeyword)
                }
                sentence.category = keyword.category
                console.log(sentence, "sentence")
                user.sentences.push(sentence)

                await user.save()
                await sentence.save()

                return sentence
    }

    async removeSentence(id: string, user: UserEntity) {
        user.sentences.filter((sentence) => sentence.id != Number(id))
        return user.sentences
    }
}