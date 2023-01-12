import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogDto {

    @IsNotEmpty()
    @IsString()
    title: string;
    @IsOptional()
    @IsString()
    img: string;
    @IsNotEmpty()
    @IsString()
    content: string;

}
