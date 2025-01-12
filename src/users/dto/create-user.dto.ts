import { IsEmail, IsOptional, IsString, Max, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({message: 'First name must be a string'})
    @MinLength(2, {message: 'First name is too short'})
    @MaxLength(50, {message: 'First name is too long'})
    readonly firstname: string;
    @IsString({message: 'First name must be a string'})
    @MinLength(2, {message: 'First name is too short'})
    @MaxLength(50, {message: 'First name is too long'})
    @IsOptional()
    readonly lastname: string;
    @IsEmail({}, {message: 'Email is invalid'})
    @MaxLength(100, {message: 'Email is too long'})
    readonly email: string;
    @IsString({message: 'Password must be a string'})
    @MinLength(6, {message: 'Password is too short'})
    @MaxLength(100, {message: 'Password is too long'})
    readonly password: string;
}
