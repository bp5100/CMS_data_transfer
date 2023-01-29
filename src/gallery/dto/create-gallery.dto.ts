import { UploadedFile, UploadedFiles } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Blog } from "src/blog/entities/blog.entity";

export class CreateGalleryDto {
    @ApiProperty()
    @IsNotEmpty()
    blog: Blog;
    
}
