import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMenuDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsOptional()
    @IsString()
    coverImg: string;
    @IsNotEmpty()
    @IsString()
    shortDescription: string;
}
