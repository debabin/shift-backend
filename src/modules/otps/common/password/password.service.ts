import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(private jwtService: JwtService) {}

  signJwt<T extends Record<string, unknown>>(payload: T) {
    return this.jwtService.sign(payload);
  }

  async validatePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
