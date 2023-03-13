import { Controller, Get, Body, Put, Param, Delete, Res, UploadedFile, Post, UseInterceptors } from "@nestjs/common";
import { ImageService } from './image.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateImageDto } from './dto/create-image.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './images.util';
@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(
    @UploadedFile() file,
    @Body() createImageDto: CreateImageDto,
  ) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    createImageDto = {
      ...createImageDto,
      url: '/images/get/' + file.filename,
      filename: file.filename,
    };
    return this.imageService.create(createImageDto);
  }

  @Get(':imgpath')
  seeCustomScreenImages(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files/blogs' });
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
