import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsInt,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => value.trim())
  name: string;

  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  // Campos del perfil
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => value.trim())
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => value.trim())
  lastName: string;

  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value)) // transforma string a número
  age: number;
}
