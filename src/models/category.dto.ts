export class CreateCategoryDTO {
    @IsString({unique: true})
    name: string;
} 