import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utility/file-upload.utils';
import { diskStorage } from 'multer';
import { UseFilters } from '@nestjs/common/decorators';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesUploadDto } from 'src/utility/file-upload.dto';

@ApiTags('gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseFilters()
  @UseInterceptors(
    FilesInterceptor('images[]', 10, {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './files/gallery',
        filename: editFileName,
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Images for Gallery',
    type: FilesUploadDto,
  })

  createManyImage(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFiles() files,
  ) {
    if (files.length < 1) {
      throw new Error('Please Upload Images.');
    }
    let createBlogGallery = [{}];
    for (let i = 0; i < files.length; i++) {
      createBlogGallery[i] = {
        title: files[i].originalname,
        url: '/image/' + files[i].filename,
        filename: files[i].filename,
        blog: createGalleryDto.blog,
      };
    }
    return this.galleryService.createManyImage(createBlogGallery);
  }

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalleryDto: UpdateGalleryDto) {
    return this.galleryService.update(+id, updateGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
