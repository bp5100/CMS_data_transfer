import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor, } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utility/file-upload.utils';
import { AdvertisementService } from './advertisement.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { diskStorage } from 'multer'

@Controller('advertisement')
export class AdvertisementController {
  constructor(
    private readonly advertisementService: AdvertisementService
    ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/advertisements',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  
  create(@Body() createAdvertisementDto: CreateAdvertisementDto, @UploadedFile() file) {
    if(file != undefined) {
      createAdvertisementDto.img = '/image/' + file.filename
    }
   return this.advertisementService.create(createAdvertisementDto);
  }

  @Get()
  findAll() {
    return this.advertisementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertisementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvertisementDto: UpdateAdvertisementDto) {
    return this.advertisementService.update(+id, updateAdvertisementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertisementService.remove(+id);
  }
}
