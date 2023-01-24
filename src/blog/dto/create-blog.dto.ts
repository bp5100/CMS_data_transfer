import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Menu } from "src/menu/entities/menu.entity";

export class CreateBlogDto {
    @IsNotEmpty()
    @IsString()
    title: string;
   
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    menu: Menu;

}
