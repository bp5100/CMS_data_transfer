import { type } from "os";
import { Menu } from "src/menu/entities/menu.entity";
import {PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Blog {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column({nullable: true})
    img: string;

    @Column({type: "text"})
    content: string;

    @ManyToOne(type => Menu, menu => menu.blog)
    @JoinColumn({name: 'menuId', referencedColumnName: 'id'})
    menu: Menu;

    @CreateDateColumn({type:"timestamp"})
    createdAt: string;

    @UpdateDateColumn({type:"timestamp"})
    updatedAt: string;

}
