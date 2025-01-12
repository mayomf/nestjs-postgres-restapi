import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    @MinLength(2)
    @MaxLength(50)
    readonly firstname: string;
    
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    @MaxLength(50)
    readonly lastname: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    @MinLength(6)
    @MaxLength(100)
    readonly password: string;
}