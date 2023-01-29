import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Menu } from "src/menu/entities/menu.entity";

export class CreateBlogDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;
   
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsNotEmpty()
    menu: Menu;

}
