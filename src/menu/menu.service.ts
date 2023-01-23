import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {

  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ){};

  async create(createMenuDto: CreateMenuDto, url: string) {
    let newMenu = await this.menuRepository.save(createMenuDto);
    newMenu.coverImg = url;
    return await this.menuRepository.save({
      ...newMenu, 
      ...UpdateMenuDto 
    });
  }
 
  async findAll() {
    return await this.menuRepository.createQueryBuilder("menu").getMany();
  }

  async findOne(id: number) {
    return await this.menuRepository.createQueryBuilder("menu")
    .where(`menu.id=${id}`).leftJoinAndSelect("menu.blog", "blog").getOne();
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    return await this.menuRepository.update(id, updateMenuDto);
  }

  async remove(id: number) {
    return await this.menuRepository.delete(+id);
  }
}
