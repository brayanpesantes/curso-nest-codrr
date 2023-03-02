import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * login
   */
  @Post('login')
  public async login(@Body() { username, password }: LoginUserDto) {
    const user = await this.authService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException('credentials are invalid');
    }
    const token = await this.authService.generateJWT(user);
    return token;
  }
}
