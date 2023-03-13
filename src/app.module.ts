import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from './image/image.module';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { GalleryModule } from './gallery/gallery.module';
import * as dotenv from 'dotenv';
import { MulterModule } from "@nestjs/platform-express";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UserModule } from "./user/user.module";

dotenv.config();
@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    MenuModule,
    BlogModule,
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ImageModule,
    AdvertisementModule,
    GalleryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
