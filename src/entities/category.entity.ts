import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { KeywordEntity } from './keyword.entity';
import { SentenceEntity } from './sentence.entity';

export enum Categories {
  DEVICE = 'device',
  CLIENT = 'client',
  COLLEGE = 'college',
  SCHOOL = 'school',
  //TODO : add more categories
}

@Entity('category')
export class CategoryEntity extends AbstractEntity {
  @Column({ type: 'enum', enum: Categories })
  name: Categories;

  @OneToMany((type) => SentenceEntity, (sentence) => sentence.category)
  sentences: SentenceEntity[];

  @OneToMany((type) => SentenceEntity, (keyword) => keyword.category)
  keywords: KeywordEntity[];
}
