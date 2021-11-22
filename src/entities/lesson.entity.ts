import { IsString } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { CategoryEntity } from "./category.entity";
import { KeywordEntity } from "./keyword.entity";
import { SentenceEntity } from "./sentence.entity";
import { UserEntity } from "./user.entity";

@Entity('lesson')
export class LessonEntity extends AbstractEntity {
    @Column({unique: true})
    @IsString()
    name: string

    @ManyToMany((type) => UserEntity, (user) => user.lessons)
    @JoinTable()
    users: UserEntity[]

    @ManyToMany((type) => CategoryEntity, (category) => category.lessons, {eager: true})
    @JoinTable()
    categories: CategoryEntity[]

    // @ManyToMany((type) => SentenceEntity, (sentence) => sentence.lessons, {eager: true})
    // @JoinTable()
    // sentences: SentenceEntity[]
}