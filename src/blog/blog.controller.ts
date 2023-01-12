import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res, ValidationPipe, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { editFileName, imageFileFilter } from '../file-upload.utils';
import { diskStorage } from 'multer';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}


  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )

  create(@Body() createBlogDto: CreateBlogDto, @UploadedFile() file) {
     if(file != undefined) {
    const response = {
          originalname: file.originalname,
          filename: file.filename,
          url: './files/'+ file.filename};
      return this.blogService.create(createBlogDto, response.url);
    }

    else{
      return this.blogService.create(createBlogDto, null);
    }
    }
  
  @Get('image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
