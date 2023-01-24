import { Blog } from "src/blog/entities/blog.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { typeEnum } from "../types";


@Entity()
export class Advertisement {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column({type: 'text'})
    description: string;

    @Column({nullable: true})
    img: string;

    @Column({nullable: true})
    link: string;

    @ManyToOne(type => Blog, blog => blog.advertisement)
    @JoinColumn({name: 'blogId', referencedColumnName: 'id' })
    blog: Blog;
    
    @Column({ type: 'enum', enum: typeEnum, default: typeEnum.INFO })
    type: typeEnum;
    
    @Column()
    order: string;

    @CreateDateColumn({type:"timestamp"})
    createdAt: string;

    @UpdateDateColumn({type:"timestamp"})
    updatedAt: string;

    @DeleteDateColumn({type: "timestamp"})
    public deletedAt: string;

}
