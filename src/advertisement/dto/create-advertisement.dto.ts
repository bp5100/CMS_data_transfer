import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Blog } from "src/blog/entities/blog.entity";
import { typeEnum } from "src/utility/types";

export class CreateAdvertisementDto {
    @IsNotEmpty()
    blog: Blog;

    @IsOptional()
    img: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    type: typeEnum;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    link: string;

    @IsNotEmpty()
    order: string;
}
