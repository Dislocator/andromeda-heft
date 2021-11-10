import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { KeywordEntity } from '../entities/keyword.entity';
import { SentenceEntity } from '../entities/sentence.entity';
import { SentencePartEntity } from '../entities/sentencePart.entity';
import { SentenceTemplateEntity } from '../entities/sentenceTemplate.entity';
import { UserEntity } from '../entities/user.entity';
import { UserInfoDTO } from '../models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ){}
    async updatePersonalInfo(user: UserEntity, data: UserInfoDTO) {
        const updatedUser: UserEntity = await this.userRepository.save({
            ...user,
            ...data
        })

        return updatedUser
    }


}
