import { Transform, Type } from "class-transformer";
import { IsNumber, isNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    firstName: string;

    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    lastName: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number) // ← transforma "25" (string) en 25 (number)
    age: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    userId: number;
}
