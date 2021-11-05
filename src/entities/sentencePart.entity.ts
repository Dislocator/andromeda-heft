import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
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
  @Column({unique: true})
  name: string;

  @ManyToMany((type) => SentenceTemplateEntity, (template) => template.sentenceParts)
  @JoinTable()
  templates: SentenceTemplateEntity[];

  @OneToMany((type) => KeywordEntity, (keyword) => keyword.sentencePart)
  keywords: KeywordEntity[];
}
