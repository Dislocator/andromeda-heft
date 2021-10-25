import {
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

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;
}

export interface AuthPayload {
  email: string;
}
