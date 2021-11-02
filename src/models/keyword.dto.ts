import { IsOptional, IsString } from "class-validator";

export class CreateKeywordDTO {
    @IsString()
    word: string;
    @IsString()
    category: string;
    @IsString()
    sentencePart: string;
}

export class UpdateKeywordDTO {
    @IsString()
    @IsOptional()
    keyword: string;
    @IsOptional()
    @IsString()
    category: string;
    @IsOptional()
    @IsString()
    sentencePart: string;
}