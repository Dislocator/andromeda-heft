import { IsString } from "class-validator";
import { SentencePartEntity } from "src/entities/sentencePart.entity";

export class SentenceTemplateDTO {
    sentenceParts: SentencePartEntity[]
}