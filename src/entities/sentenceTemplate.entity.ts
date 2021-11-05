import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { KeywordEntity } from './keyword.entity';
import { SentencePartEntity } from './sentencePart.entity';

@Entity('sentenseTemplate')
export class SentenceTemplateEntity extends AbstractEntity {
    @ManyToMany((type) => SentencePartEntity, (part) => part.templates, {eager: true})
    sentenceParts: SentencePartEntity[];
}
