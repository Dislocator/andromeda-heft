import { IsOptional, IsString } from "class-validator";

export class CreateLessonDTO {
    @IsString()
    name: string
    @IsString({each: true})
    categories: string[]
}

export class UpdateLessonDTO {
    @IsString() 
    @IsOptional()
    name: string
}