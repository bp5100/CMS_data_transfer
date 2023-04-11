import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ValidationPipe,
  UsePipes,
  Res,
  UploadedFile,
  UseFilters,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utility/file-upload.utils';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from 'src/utility/file-upload.dto';

@ApiTags('menu')
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image for Menu',
    type: FileUploadDto,
  })

  async create(@Body() createMenuDto: CreateMenuDto, @UploadedFile() file) {
    if(file){
      const response = {
        originalname: file.originalname,
        filename: file.filename,
        url: '/image/' + file.filename,
      }; 
      createMenuDto.coverImg = response.url;
    }
    
    return this.menuService.create(createMenuDto);
  }

  @Get('image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files/menus' });
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get('title/:title')
  findMenusByTitle(@Param('title') title: string) {
    return this.menuService.findMenusByTitle(title);
  }

  @Get('id/:id')
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
