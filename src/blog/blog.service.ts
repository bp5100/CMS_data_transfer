import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
  @InjectRepository(Blog)
  private blogRepository: Repository<Blog>,
  ){}

  async create(createBlogDto: CreateBlogDto, url: string) {
    let newBlog = await this.blogRepository.save(createBlogDto);
    newBlog.img = url;
    return await this.blogRepository.save({
      ...newBlog, 
      ...UpdateBlogDto 
    });
  }

  async findAll() {
    return await this.blogRepository.createQueryBuilder("blog").getMany();
  }

  async findOne(id: number) {
    return await this.blogRepository.createQueryBuilder("blog").where(`blog.id=${id}`).leftJoinAndSelect("blog.menu", "menu").getOne();
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    return await this.blogRepository.update(id, updateBlogDto);
  }

  async remove(id: number) {
    return await this.blogRepository.delete(+id);
  }
}
