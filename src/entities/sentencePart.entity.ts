import { Column, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { KeywordEntity } from './keyword.entity';
import { SentenceTemplate } from './sentenceTemplate.entity';

export enum SentenceParts {
  WHAT = 'what',
  WITHWHAT = 'withwhat',
  HOW = 'how',
  // TODO: change to appropriate parts
}

export class SentencePartEntity extends AbstractEntity {
  @Column({
    type: 'enum',
    enum: SentenceParts,
    default: SentenceParts.WHAT,
  })
  name: SentenceParts;

  @OneToMany((type) => SentenceTemplate, (template) => template.sentenceParts)
  templates: SentenceTemplate[];

  @OneToMany((type) => KeywordEntity, (keyword) => keyword.sentencePart)
  keywords: KeywordEntity[];
}
