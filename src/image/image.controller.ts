import { Controller, Get, Body, Put, Param, Delete, Res} from "@nestjs/common";
import { ImageService } from './image.service';
import { UpdateImageDto } from './dto/update-image.dto';


@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

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
