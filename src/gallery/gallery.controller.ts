import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/file-upload.utils';
import { diskStorage } from 'multer';

@Controller('gallery')
export class GalleryController {
  constructor(
    private readonly galleryService: GalleryService,
    ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images[]', 10, {
     fileFilter: imageFileFilter,
      storage: diskStorage({
      destination: './files/gallery',
      filename: editFileName,
       }),
     }) 
   ) 
   createManyImage(@Body() createGalleryDto: CreateGalleryDto, @UploadedFiles() files) {
    console.log(createGalleryDto)
    let createBlogGallery = [{}];
    if(files != undefined) {
        for (let i = 0; i < files.length; i++ ) {   
           createBlogGallery[i] = {
           title: files[i].originalname,
           url: '/image/' + files[i].filename,
           filename: files[i].filename,
           blog : createGalleryDto.blog,
       };
      }}
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
