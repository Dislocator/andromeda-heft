import { IsEnum, IsOptional, IsString,  } from "class-validator";
import { Categories } from "../entities/category.entity";
import { SentenceParts } from "../entities/sentencePart.entity";

export class CategoryDTO {
    @IsEnum(Categories)
    name: Categories
}