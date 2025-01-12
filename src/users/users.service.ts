import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findByEmailWithPassword(email: string) {
    return this.usersRepository.findOne({
      where: {email},
      select: ['id', 'firstname','lastname','email', 'password', 'role', 'active','deleted_at'],
    });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneByOrFail({email})
    .catch((error) => {throw new HttpException(`${email} was Not Found`, 404)});  
  
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
