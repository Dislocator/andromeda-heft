import { IsString } from 'class-validator';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { CategoryEntity } from './category.entity';
import { SentenceEntity } from './sentence.entity';
import { SentencePartEntity } from './sentencePart.entity';

@Entity('keywords')
export class KeywordEntity extends AbstractEntity {
  @Column({ unique: true })
  @IsString()
  word: string;

  @ManyToOne((type) => SentencePartEntity, (sentence) => sentence.keywords, {
    eager: true,
  })
  sentencePart: SentencePartEntity;

  @ManyToOne((type) => CategoryEntity, (category) => category.keywords, {
    eager: true,
  })
  category: CategoryEntity;

  @ManyToMany((type) => SentenceEntity, (sentence) => sentence.keywords, {
    eager: true
  })
  sentences: SentenceEntity[];
}
