import { Column, ManyToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { CategoryEntity } from './category.entity';
import { KeywordEntity } from './keyword.entity';
import { UserEntity } from './user.entity';
export class SentenceEntity extends AbstractEntity {
  @ManyToOne((type) => CategoryEntity, (category) => category.sentences, {
    eager: true,
  })
  category: CategoryEntity;

  @ManyToMany((type) => KeywordEntity, (keyword) => keyword.sentences)
  keywords: KeywordEntity[];

  @ManyToMany((type) => UserEntity, (user) => user.sentences)
  users: UserEntity[];
}
