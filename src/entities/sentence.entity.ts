import { Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { CategoryEntity } from './category.entity';

export enum SentenceTemplates {
  WHAT_WITHWHAT_HOW = 'what-withwhat-how',
  // TODO: add more templates
}

export const templates = [['what', 'withwhat', 'how']];

export class SentenceEntity extends AbstractEntity {
  @Column({ type: 'enum', enum: SentenceTemplates })
  sentenceTemplate: SentenceTemplates;

  @ManyToOne((type) => CategoryEntity, (category) => category.sentences, {
    eager: true,
  })
  category: CategoryEntity;
}
