import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Res, ValidationPipe, UsePipes, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { editFileName, imageFileFilter } from '../utility/file-upload.utils';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesUploadDto } from 'src/utility/file-upload.dto';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(
   FilesInterceptor('images[]', 10, {
    fileFilter: imageFileFilter,
     storage: diskStorage({
     destination: './files/blogs',
     filename: editFileName,
      }),
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
  description: 'Images for Blog',
  type: FilesUploadDto,
  })
  uploadFile(@UploadedFiles() files) {}

  create(@Body() createBlogDto: CreateBlogDto, @UploadedFiles() files) {
    return this.blogService.create(createBlogDto, files)
  }
  
  @Get('image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files/blogs' });
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }
 
  @Get('title/:title')
  blogTitle(@Param('title') title:string) {
    return this.blogService.blogTitle(title);
  }

  @Get('content/:searchWords')
  blogContent(@Param('searchWords') searchWords:string) {
    return this.blogService.blogContent(searchWords);
  }

  @Get('gallery/:id')
  blogGalleryById(@Param('id') id:string) {
    return this.blogService.blogGalleryById(+id);
  }

  @Get('advertisement/:id')
  advertisemntByBlogId(@Param('id') id: string) {
    return this.blogService.advertisementByBlogId(+id);
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
