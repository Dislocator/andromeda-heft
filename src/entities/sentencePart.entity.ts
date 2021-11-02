import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { KeywordEntity } from './keyword.entity';
import {  SentenceTemplateEntity } from './sentenceTemplate.entity';

export enum SentenceParts {
  WHAT = 'what',
  WITHWHAT = 'withwhat',
  HOW = 'how',
  // TODO: change to appropriate parts
}

@Entity('sentenceParts')
export class SentencePartEntity extends AbstractEntity {
  @Column({
    type: 'enum',
    enum: SentenceParts,
  })
  name: SentenceParts;

  @OneToMany((type) => SentenceTemplateEntity, (template) => template.sentenceParts)
  templates: SentenceTemplateEntity[];

  @OneToMany((type) => KeywordEntity, (keyword) => keyword.sentencePart)
  keywords: KeywordEntity[];
}
