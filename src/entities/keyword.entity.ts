import { IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { CategoryEntity } from './category.entity';
import { SentenceEntity } from './sentence.entity';
import { SentencePartEntity } from './sentencePart.entity';
import { UserEntity } from './user.entity';

@Entity('keywords')
export class KeywordEntity extends AbstractEntity {
  @Column({ unique: true })
  @IsString()
  word: string;

  @ManyToOne((type) => SentencePartEntity, (sentence) => sentence.keywords, {eager: true})
  sentencePart: SentencePartEntity;

  @ManyToOne((type) => CategoryEntity, (category) => category.keywords)
  category: CategoryEntity;

  @ManyToMany((type) => SentenceEntity, (sentence) => sentence.keywords)
  @JoinTable()
  sentences: SentenceEntity[];
  @ManyToMany((type) => UserEntity, (user) => user.keywords, )
  @JoinTable()
  users: UserEntity[];
}
