import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ROLES } from 'src/constants/roles';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  frist_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}
