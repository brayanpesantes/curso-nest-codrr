import { IsNotEmpty, IsString } from 'class-validator';
import { AuthBody } from 'src/interface/auth.interface';

export class LoginUserDto implements AuthBody {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
