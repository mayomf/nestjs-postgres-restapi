import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()  
    readonly email: string;

    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    readonly password: string;
}