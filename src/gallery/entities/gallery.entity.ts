import { Blog } from "src/blog/entities/blog.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Gallery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    title: string;

    @Column({nullable:true})
    filename: string;

    @Column({nullable:true})
    url: string;

    @ManyToOne(type => Blog, blog => blog.gallery)
    @JoinColumn({name: "blogId", referencedColumnName: "id"})
    blog: Blog;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    public deletedAt: Date;

}
