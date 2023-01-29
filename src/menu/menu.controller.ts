import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ValidationPipe, UsePipes,  Res, UploadedFile } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utility/file-upload.utils';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('coverImg', {
      storage: diskStorage({
        destination: './files/menus',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  
   create(@Body() createMenuDto: CreateMenuDto, @UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
      url: '/image/' + file.filename,
    };
      return this.menuService.create(createMenuDto, response.url)
   }
  
  @Get('image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files/menus' });
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':title')
  findBlogs(@Param('title') title: string) {
    return this.menuService.findBlogs(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  } 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
