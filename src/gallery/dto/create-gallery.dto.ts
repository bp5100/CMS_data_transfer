import { IsNotEmpty } from "class-validator";
import { Blog } from "src/blog/entities/blog.entity";

export class CreateGalleryDto {
    @IsNotEmpty()
    blog: Blog
}
