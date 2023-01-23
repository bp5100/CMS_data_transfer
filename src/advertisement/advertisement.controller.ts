import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { editFileName, imageFileFilter } from 'src/file-upload.utils';
import { AdvertisementService } from './advertisement.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { Advertisement } from './entities/advertisement.entity';
import { diskStorage } from 'multer'

@Controller('advertisement')
export class AdvertisementController {
  constructor(
    @InjectRepository(Advertisement)
    private readonly advertisementService: AdvertisementService
    ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images[]', 10, {
      fileFilter: imageFileFilter,
       storage: diskStorage({
       destination: './files/advertisements',
       filename: editFileName,
        }),
      })
  )
  create(@Body() createAdvertisementDto: CreateAdvertisementDto, @UploadedFiles() files) {
    
    console.log(files)
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
