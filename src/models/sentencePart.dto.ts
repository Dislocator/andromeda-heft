import { IsEnum, IsOptional, IsString,  } from "class-validator";
import { SentenceParts } from "../entities/sentencePart.entity";

export class SentencePartDTO {
    @IsString()
    name: string

}