import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: any, done: (error?: Error | null, data?: any) => void) {
    try {
      done(null, {
        ...payload
      });
    } catch (err) {
      throw new UnauthorizedException('Unauthorized', err.message);
    }
  }
}
