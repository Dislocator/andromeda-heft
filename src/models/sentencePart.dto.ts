import { IsEnum, IsOptional, IsString,  } from "class-validator";
import { SentenceParts } from "src/entities/sentencePart.entity";

export class SentencePartDTO {
    @IsString()
    name: string

}