import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Breed } from "src/breeds/entities/breed.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Cat {
    @Column({primary: true, type: 'int', generated:true})
    id: number;
    
    @Column({type: 'varchar', length: 100})
    name: string;
    
    @Column({type: 'int'})
    age: number;

    @ManyToOne(() => Breed, breed => breed.id,{
        eager: true,
        cascade: true,
    })
    breed:  Breed;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_email', referencedColumnName: 'email'})
    user: User;

    @Column({type: 'varchar', length: 100, nullable: false})
    user_email: string;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @DeleteDateColumn({type: 'timestamp'})
    deleted_at: Date;

}
