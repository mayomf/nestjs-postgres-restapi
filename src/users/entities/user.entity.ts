import { IsIn } from "class-validator";
import { Role } from "../../common/enums/role.enum";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn }from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({type: 'varchar', length: 60, nullable: false})
    firstname: string;

    @Column({type: 'varchar', length: 60,nullable: true})
    lastname: string;

    @Column({type: 'varchar', length: 100, unique: true, nullable: false})
    email: string;

    @Column({type: 'varchar', length:100, nullable:false, select: false})
    password: string;
    
    @Column({type: 'bool', default: true})
    active: boolean;
    
    @Column({type:'enum', default:Role.USER, enum:Role})
    role: Role;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @DeleteDateColumn({type: 'timestamp'})  
    deleted_at: Date;
}
