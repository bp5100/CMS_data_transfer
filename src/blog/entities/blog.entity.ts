import { Advertisement } from 'src/advertisement/entities/advertisement.entity';
import { Gallery } from 'src/gallery/entities/gallery.entity';
import { Image } from 'src/image/entities/image.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany((type) => Image, (image) => image.blog)
  image: Image[];

  @Column({ type: 'text' })
  content: string;

  @ManyToOne((type) => Menu, (menu) => menu.blog)
  @JoinColumn({ name: 'menuId', referencedColumnName: 'id' })
  menu: Menu;

  @OneToMany((type) => Advertisement, (advertisement) => advertisement.blog)
  advertisement: Advertisement[];

  @OneToMany((type) => Gallery, (gallery) => gallery.blog)
  gallery: Gallery[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
