import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
import { IsInt, isInt, isNumber, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength } from "class-validator";


export class UpdateCatDto {
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsOptional()
    name: string;

    @IsInt()
    @IsPositive()
    @Max(30)
    @IsOptional()     
    age: number;

    @IsString()
    @MaxLength(30)
    @IsOptional()
    breed: string;
}
