import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  ValidationPipe,Get
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDTO, UserInfoDTO } from 'src/models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService,private authService: AuthService) {}
  
  @Get()
  @UseGuards(AuthGuard())
  async findCurrentUser(@User() {email}: UserEntity){
    const user = await this.authService.findCurrentUser(email)
    return user
  }

  @Post('/personal-info')
  @UseGuards(AuthGuard())
  async setPersonalInfo(
    @User() user: UserEntity,
    @Body(ValidationPipe) data: UserInfoDTO,
  ) {
    return this.userService.updatePersonalInfo(user, data)
  }

  @Put('/personal-info')
  @UseGuards(AuthGuard())
  async updatePersonalInfo(
    @User() user: UserEntity,
    @Body(ValidationPipe) data: UpdateUserDTO
  ) {
    return this.userService.updatePersonalInfo(user, data)
  }
}
