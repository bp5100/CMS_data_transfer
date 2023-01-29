import { Blog } from "src/blog/entities/blog.entity";
import {PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;
   
    @Column({nullable: true})
    coverImg: string;

    @Column()
    shortDescription: string;

    @OneToMany(type => Blog, blog => blog.menu )
    blog: Blog[]

    @CreateDateColumn({type:"timestamp"})
    createdAt: string;

    @UpdateDateColumn({type:"timestamp"})
    updatedAt: string;
}
