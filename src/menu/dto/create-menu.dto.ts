import { ApiProperty } from "@nestjs/swagger";
import { ApiPropertyOptional } from "@nestjs/swagger/dist";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMenuDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    coverImg: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    shortDescription: string;
}
