import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { Gallery } from './entities/gallery.entity';
import * as fs from 'fs';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>,
  ) {}
  async findAll() {
    return await this.galleryRepository
      .createQueryBuilder('gallery')
      .leftJoinAndSelect('gallery.blog', 'blog')
      .getMany();
  }

  async findOne(id) {
    return await this.galleryRepository
      .createQueryBuilder('gallery')
      .where(`gallery.id =${id}`)
      .getOne();
  }

  async createManyImage(images) {
    return await this.galleryRepository
      .createQueryBuilder('gallery')
      .insert()
      .into(`gallery`)
      .values([...images])
      .execute();
  }

  async update(id, updateGalleryDto: UpdateGalleryDto) {
    return await this.galleryRepository.update(+id, updateGalleryDto);
  }

  async remove(id) {
    const image: Gallery = await this.findOne(id);
    if (fs.existsSync('./files/gallery/' + image.filename)) {
      await fs.unlink('./files/gallery/' + image.filename, () => {});
    }
    const res = await this.galleryRepository.delete(+id);
    return res;
  }
}
