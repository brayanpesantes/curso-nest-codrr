import { AuthTokenResult, IUseToken } from 'src/interface/auth.interface';
import * as Jwt from 'jsonwebtoken';
export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = Jwt.decode(token) as AuthTokenResult;
    const currentDate = new Date();
    const expireDate = new Date(decode.exp);
    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: +expireDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'token not invalid';
  }
};
