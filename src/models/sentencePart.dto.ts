import { IsEnum, IsOptional, IsString,  } from "class-validator";
import { SentenceParts } from "src/entities/sentencePart.entity";

export class SentencePartDTO {
    @IsEnum(SentenceParts)
    name: SentenceParts

}