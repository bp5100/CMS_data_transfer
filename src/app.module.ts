import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';


dotenv.config()
@Module({
  imports: [
    MenuModule,
    BlogModule,
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
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
