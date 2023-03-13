import {
  AfterRemove,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from 'src/blog/entities/blog.entity';
import * as fs from 'fs';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Blog, (blog) => blog.image)
  @JoinColumn({ name: 'blogId', referencedColumnName: 'id' })
  blog: Blog;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
