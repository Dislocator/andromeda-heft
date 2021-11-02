import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { KeywordEntity } from 'src/entities/keyword.entity';
import { SentenceEntity } from 'src/entities/sentence.entity';
import { SentencePartEntity } from 'src/entities/sentencePart.entity';
import { SentenceTemplateEntity } from 'src/entities/sentenceTemplate.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserInfoDTO } from 'src/models/user.model';
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
