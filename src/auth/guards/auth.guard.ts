import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from 'src/constants/key-decorator';
import { IUseToken } from 'src/interface/auth.interface';
import { UserService } from 'src/user/user.service';
import { useToken } from 'src/utils/use.token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly refletor: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.refletor.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;
    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers['Authorization'];

    if (!token && Array.isArray(token)) {
      throw new UnauthorizedException('invalid  token');
    }

    const manageToken: IUseToken | string = useToken('token');

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }
    if (manageToken.isExpired) {
      throw new UnauthorizedException('token is expired');
    }
    const { sub } = manageToken;
    const user = await this.userService.findOne(sub);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    req.idUser = user.id;
    req.rolUser = user.role;

    return true;
  }
}
