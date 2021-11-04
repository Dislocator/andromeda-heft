import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { CategoryEntity } from './category.entity';
import { KeywordEntity } from './keyword.entity';
import { UserEntity } from './user.entity';
@Entity('sentences')
export class SentenceEntity extends AbstractEntity {
  @ManyToOne((type) => CategoryEntity, (category) => category.sentences, {
    eager: true,
  })
  category: CategoryEntity;

  @ManyToMany((type) => KeywordEntity, (keyword) => keyword.sentences, {
    eager: true
  })
  keywords: KeywordEntity[];

  @ManyToMany((type) => UserEntity, (user) => user.sentences)
  @JoinTable()
  users: UserEntity[];

}
