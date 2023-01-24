import { AfterRemove, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Blog } from 'src/blog/entities/blog.entity';
import * as fs from 'fs';

 
@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(type => Blog, blog => blog.image)
  @JoinColumn({name: 'blogId', referencedColumnName: 'id',},)
  blog: Blog;
    
  @Column()
  title: string;

  @Column()
  filename: string;
  
  @Column()
  url: string;
      
  @DeleteDateColumn()
  public deletedAt: Date;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
//   @AfterRemove()
//   async removeImages() {
//     if (fs.existsSync('./files/blogs' + this.url.replace('/images/get', ''))) {
//       await fs.unlink(
//         './files/' + this.url.replace('/images/get', ''),
//         () => {},
//       );
//     }
// } 

}
  