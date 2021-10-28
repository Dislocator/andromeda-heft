import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { KeywordEntity } from './keyword.entity';
import { SentencePartEntity } from './sentencePart.entity';

@Entity('sentenseTemplate')
export class SentenceTemplate extends AbstractEntity {
    @ManyToOne((type) => SentencePartEntity, (part) => part.templates)
    sentenceParts: SentencePartEntity[];
}
