import { BadGatewayException, BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { Cat } from './entities/cat.entity';
import { Breed } from '../breeds/entities/breed.entity';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class CatsService {

constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private breedsRepository: Repository<Breed>,
) {}

  async create(createCatDto: CreateCatDto, user: ActiveUserInterface) {

    const breed = await this.validateBreed(createCatDto.breed);

    return await this.catRepository.save({
      ...createCatDto,
      breed,  
      user_email: user.email,
    });
  }

  private async validateBreed(breed: string) {
    const breedEntity = await this.breedsRepository.findOneBy({ name: breed });
  
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
  
    return breedEntity;
  }

  async findAll(user: ActiveUserInterface) {
    if (user.role === Role.ADMIN) {
      return await this.catRepository.find();
    }
  
    return await this.catRepository.find({
      where: { user_email: user.email },
    });
  }

  async findOne(id: number, user: ActiveUserInterface) {
    const cat = await this.catRepository.findOneBy({ id });
  
    if (!cat) {
      throw new BadRequestException('Cat not found');
    }
  
    this.validateOwnership(cat, user);
  
    return cat;
  }
  
  private validateOwnership(cat: Cat, user: ActiveUserInterface) {
    if (user.role !== Role.ADMIN && cat.user_email !== user.email) {
      throw new UnauthorizedException();
    }
  }

  async update(id: number, updateCatDto: UpdateCatDto, user: ActiveUserInterface) {
    await this.findOne(id, user );
    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
      user_email: user.email,
    })
  }

  async remove(id: number, user: ActiveUserInterface) {
    await this.findOne(id, user);
    return await this.catRepository.softDelete({ id });
  }
  
  async restore(id: number, user: ActiveUserInterface) {
    await this.findOne(id, user);
    return (await this.catRepository.restore({ id })).affected;
  }

}
