import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as fs from 'fs';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}
  async create(createImageDto: CreateImageDto): Promise<Image> {
    return await this.imageRepository.save(createImageDto);
  }
  async findAll(): Promise<Image[]> {
    return await this.imageRepository
      .createQueryBuilder('image')
      .leftJoinAndSelect('image.blog', 'blog')
      .getMany();
  }

  async findOne(id) {
    return await this.imageRepository
      .createQueryBuilder('image')
      .where(`image.id =${id}`)
      .getOne();
  }

  async createManyImage(images) {
    return await this.imageRepository
      .createQueryBuilder('image')
      .insert()
      .into('image')
      .values([...images])
      .execute();
  }

  async update(id, updateImageDto: UpdateImageDto) {
    return await this.imageRepository.update(+id, updateImageDto);
  }

  async remove(id) {
    const image: Image = await this.findOne(id);
    if (fs.existsSync('./files/blogs/' + image.filename)) {
      await fs.unlink('./files/blogs/' + image.filename, () => {});
    }
    const res = await this.imageRepository.delete(+id);
    return res;
  }
}
