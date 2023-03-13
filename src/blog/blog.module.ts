import { forwardRef, Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), forwardRef(() => ImageModule)],
  controllers: [BlogController],
  providers: [BlogService, Repository],
  exports: [BlogService],
})
export class BlogModule {}
