import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { BaseEntity, BeforeInsert, Column, Entity, ManyToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AbstractEntity } from './abstract-entity';
import { KeywordEntity } from './keyword.entity';
import { SentenceEntity } from './sentence.entity';
@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  profession: string
  @Column()
  company: string
  @Column()
  chiefName: string
  @Column()
  learningStartDate: Date
  @Column()
  learningFinishDate: Date
  @Column()
  @Exclude()
  password: string;

  @ManyToMany((type) => KeywordEntity)
  keywords: KeywordEntity[];

  @ManyToMany((type) => SentenceEntity, (sentence) => sentence.users)
  sentences: SentenceEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
