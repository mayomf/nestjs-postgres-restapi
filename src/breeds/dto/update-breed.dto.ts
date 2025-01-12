import { PartialType } from '@nestjs/mapped-types';
import { CreateBreedDto } from './create-breed.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBreedDto extends PartialType(CreateBreedDto) {
    @IsOptional()
    name: string;
}
