import { Column, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { KeywordEntity } from './keyword.entity';

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
  })
  sentencePart: SentenceParts;

  @OneToMany((type) => KeywordEntity, (keyword) => keyword.sentencePart)
  keywords: KeywordEntity[];
}
