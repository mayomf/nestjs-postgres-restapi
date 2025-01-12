import { Entity,Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";
import { OneToMany } from "typeorm";
import { Cat } from "src/cats/entities/cat.entity";

@Entity()
export class Breed {
    @Column({primary: true, type: 'bigint', generated:true})
    id: number;

    @Column({type: 'varchar', length: 30, unique: true})
    name: string;

    @Column({type: 'varchar', length: 100, nullable: true})
    description: string;

    @OneToMany(() => Cat, (cat) => cat.breed)
    cats: Cat[];

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @DeleteDateColumn({type: 'timestamp'})
    deleted_at: Date;

    
}
