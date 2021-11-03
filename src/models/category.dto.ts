import { IsEnum, IsOptional, IsString,  } from "class-validator";
import { Categories } from "src/entities/category.entity";
import { SentenceParts } from "src/entities/sentencePart.entity";

export class CategoryDTO {
    @IsEnum(Categories)
    name: Categories
}