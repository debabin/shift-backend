import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generate } from 'generate-password';

import { PasswordService } from './common/password';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private passwordService: PasswordService
  ) {}

  async register<T extends { phone: string }>(user: T) {
    return this.authenticate(user);
  }

  async login<T extends { phone: string }>(user: T) {
    return this.authenticate(user);
  }

  async decode(token: string) {
    return this.jwtService.decode(token);
  }

  async authenticate<T extends { phone: string }>(user: T): Promise<{ user: T; token: string }> {
    const payload: { phone: T['phone'] } = {
      phone: user.phone
    };

    return {
      user,
      token: this.jwtService.sign(payload)
    };
  }

  async hashPassword(password: string): Promise<string> {
    return this.passwordService.hashPassword(password);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return this.passwordService.validatePassword(password, hash);
  }

  async generatePassword(): Promise<string> {
    return generate({
      length: 24,
      numbers: true
    });
  }
}
