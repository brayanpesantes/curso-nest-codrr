import {
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ROLES } from 'src/constants/roles';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  frist_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;
}
