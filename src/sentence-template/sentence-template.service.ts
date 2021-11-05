import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { KeywordEntity } from 'src/entities/keyword.entity';
import { SentencePartEntity } from 'src/entities/sentencePart.entity';
import { SentenceTemplateEntity } from 'src/entities/sentenceTemplate.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CategoryDTO } from 'src/models/category.dto';
import { SentencePartDTO } from 'src/models/sentencePart.dto';
import { SentenceTemplateDTO } from 'src/models/sentenceTemplate.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SentenceTemplateService {  constructor(
    @InjectRepository(SentenceTemplateEntity) private sentenceTemplateEntity: Repository<SentenceTemplateEntity>,
    @InjectRepository(SentencePartEntity) private sentencePartEntity: Repository<SentencePartEntity>,

) {}
async findAll() {
    const sentenceParts = await this.sentenceTemplateEntity.find()
    return sentenceParts
}

async addSentenceTemplate(data: SentenceTemplateDTO) {
    try {
        console.log(data.sentenceParts)
        const template = await this.sentenceTemplateEntity.create()
        template.sentenceParts = []
        for (const sentencePartName of data.sentenceParts) {
            const sentencePart = await this.sentencePartEntity.findOne({where: {name: sentencePartName}})
            console.log(sentencePart, "--------------------------------")
            if (sentencePart !== undefined) {
                template.sentenceParts.push(sentencePart)
                console.log(template, "-----template---------------------------")
            }console.log(sentencePart, "part")
        }
        console.log(template, "template")
        console.log(await this.sentenceTemplateEntity.find(),'before')
        await template.save()
        console.log(await this.sentenceTemplateEntity.find(), "after")
        return template
    } catch (error) {
        throw new InternalServerErrorException(error)
    }
}

async removeSentenceTemplate(id: number) {
    try {
        const template = await this.sentenceTemplateEntity.findOneOrFail(id)
        template.remove()
        return template
        
    } catch (error) {
        throw new InternalServerErrorException(error)
    }
}

}
