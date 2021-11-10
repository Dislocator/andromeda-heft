import { IsString } from "class-validator";
import { SentencePartEntity } from "../entities/sentencePart.entity";

export class SentenceTemplateDTO {
    sentenceParts: SentencePartEntity[]
}