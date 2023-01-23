import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Advertisement {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column()
    type: string;

    @Column({type: 'text'})
    description: string;

    @Column({nullable: true})
    img: string;
    
    @Column()
    order: string;

    @CreateDateColumn({type:"timestamp"})
    createdAt: string;

    @UpdateDateColumn({type:"timestamp"})
    updatedAt: string;

    @DeleteDateColumn({type: "timestamp"})
    public deletedAt: string;

}
