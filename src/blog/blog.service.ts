import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class BlogService {
  constructor(
    @Inject(ImageService)
    private readonly imageService: ImageService,
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ){}
  
  async create(createBlogDto: CreateBlogDto, files) {
    let newBlog = await this.blogRepository.save(createBlogDto);
    let createImages = [{ }]
    if(files != undefined) {
       for (let i = 0; i < files.length; i++ ) {   
          createImages[i] = {
          title: files[i].filename,
          url: '/image/blog-img/' + files[i].filename,
          filename: files[i].filename,
          blog: newBlog.id
        };
      }}
    this.imageService.createManyImage(createImages)
    return await this.blogRepository.save({
      ...newBlog, 
      ...UpdateBlogDto 
      });
}

  async findAll() {
    return await this.blogRepository.createQueryBuilder("blog")
    .leftJoinAndSelect("blog.image", "image").getMany();
  }

  async findOne(id: number) {
    return await this.blogRepository.createQueryBuilder("blog")
    .where(`blog.id=${id}`).leftJoinAndSelect("blog.menu", "menu").getOne();
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    return await this.blogRepository.update(id, updateBlogDto);
  }

  async remove(id: number) {
    return await this.blogRepository.delete(+id);
  }
}
