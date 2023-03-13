import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Blog } from 'src/blog/entities/blog.entity';
import { typeEnum } from 'src/utility/types';

export class CreateAdvertisementDto {
  @ApiProperty()
  @IsNotEmpty()
  blog: Blog;

  @ApiPropertyOptional()
  @IsOptional()
  img: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  type: typeEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  link: string;

  @ApiProperty()
  @IsNotEmpty()
  order: number;
}
