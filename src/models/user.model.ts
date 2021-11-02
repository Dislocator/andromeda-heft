import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  lastName: string;
}

export class UserInfoDTO {
  @IsString()
  firstName: string
  @IsString()
  lastName: string
  @IsString()
  profession: string
  @IsString()
  company: string
  @IsString()
  chiefName: string
  @IsDate()
  learningStartDate: Date
  @IsDate()
  learningFinishDate: Date
}
export class UpdateUserDTO {
  @IsString()
  @IsOptional()
    firstName: string
    @IsString()
    @IsOptional()
    lastName: string
    @IsString()
    @IsOptional()
    profession: string
    @IsString()
    @IsOptional()
    company: string
    @IsString()
    @IsOptional()
    chiefName: string
    @IsDate()
    @IsOptional()
    learningStartDate: Date
    @IsDate()
    @IsOptional()
    learningFinishDate: Date
}

export interface AuthPayload {
  email: string;
}
