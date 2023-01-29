import { Blog } from "src/blog/entities/blog.entity";
import { typeEnum } from "src/utility/types";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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
    
    @Column({default: 1})
    order: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    public deletedAt: Date;

}
