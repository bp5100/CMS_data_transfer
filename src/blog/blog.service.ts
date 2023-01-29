import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageService } from 'src/image/image.service';
import * as fs from "fs";
import { Image } from 'src/image/entities/image.entity';


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
    if(files.length > 0) {
       for (let i = 0; i < files.length; i++ ) {   
          createImages[i] = {
          title: files[i].filename,
          url: '/image/blog/' + files[i].filename,
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
    .leftJoinAndSelect("blog.image", "image")
    .getMany();
  }

  async findOne(id: number) {
    return await this.blogRepository.createQueryBuilder("blog")
    .where(`blog.id=${id}`)
    .leftJoinAndSelect("blog.menu", "menu")
    .getOne();
  }

  async blogTitleById(id: number) {
    return await this.blogRepository.createQueryBuilder("blog")
    .where(`blog.id=${id}`)
    .select(['blog.id', 'blog.title'])
    .getOne();    
  } 

  async blogGalleryById(id: number) {
    return await this.blogRepository.createQueryBuilder("blog")
    .where(`blog.id=${id}`)
    .leftJoinAndSelect("blog.gallery", "gallery")
    .select(['blog.title', 'gallery'])
    .getOne();
  } 

   async advertisementByBlogId(id: number) {
    return await this.blogRepository.createQueryBuilder("blog")
    .where(`blog.id=${id}`)
    .leftJoinAndSelect("blog.advertisement", "advertisement")
    .select(['blog.id', 'blog.title', 'advertisement'])
    .orderBy({
      "advertisement.order" : "ASC"
      ,"advertisement.type" : "ASC"
    })
    .getMany();
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    return await this.blogRepository.update(id, updateBlogDto);
  }

  async remove(id: number) {
    const blog: Blog = await this.findOne(id);
    const image = blog.image;
    if (fs.existsSync("./files/blogs/" + image["originalname"])) {
      await fs.unlink("./files/blogs/" + image["originalname"], () => {
      });
    }
    const res = await this.blogRepository.delete(+id);
    return res;
  }
}
 