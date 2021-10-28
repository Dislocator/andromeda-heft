import { IsString } from 'class-validator';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { CategoryEntity } from './category.entity';
import { SentenceEntity } from './sentence.entity';
import { SentencePartEntity } from './sentencePart.entity';
import { UserEntity } from './user.entity';

@Entity('keywords')
export class KeywordEntity extends AbstractEntity {
  @Column()
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
  @ManyToMany((type) => UserEntity)
  users: UserEntity[];

  sentences: SentenceEntity[];
}
