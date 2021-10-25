import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { BaseEntity, BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AbstractEntity } from './abstract-entity';
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
  @Exclude()
  password: string;

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
