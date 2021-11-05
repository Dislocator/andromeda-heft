import { IsOptional, IsString } from "class-validator";

export class CreateLessonDTO {
    @IsString()
    name: string
}

export class UpdateLessonDTO {
    @IsString() 
    @IsOptional()
    name: string
}