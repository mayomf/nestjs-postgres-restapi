import { IsInt, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateCatDto {
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    name: string;

    @IsInt()
    @Min(0)
    @Max(30)
    age: number;

    @IsString()
    @MaxLength(30)
    breed: string;
}
