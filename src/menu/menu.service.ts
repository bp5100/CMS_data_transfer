import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import * as fs from 'fs';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    try{
        return await this.menuRepository.save(createMenuDto);
    }catch(error){
      if(error.code === '23505') {
        throw new ConflictException("Menu title already exists!!");
      }
      else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAll() {
    return await this.menuRepository.createQueryBuilder('menu').getMany();
  }

  async findOne(id: number) {
    return await this.menuRepository
      .createQueryBuilder('menu')
      .where(`menu.id=${id}`)
      .leftJoinAndSelect('menu.blog', 'blog')
      .getOne();
  }

  async findMenusByTitle(title: string) {
    console.log(title);
    return await this.menuRepository
      .createQueryBuilder('menu')
      .where('menu.title like :menuTitle', { menuTitle: `%${title}%` })
      .leftJoinAndSelect('menu.blog', 'blog')
      .select(['menu.title', 'blog.title'])
      .getMany();
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    return await this.menuRepository.update(id, updateMenuDto);
  }

  async remove(id: number) {
    const menu: Menu = await this.findOne(id);
    const name = menu.coverImg.split('/')[2];
    if (fs.existsSync('./files/menus/' + name)) {
      await fs.unlink('./files/menus/' + name, () => {});
    }
    const res = await this.menuRepository.delete(+id);
    return res;
  }
}
