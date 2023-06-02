import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generate } from 'generate-password';

import { User } from '@/modules/users';

import { LoginResponse, RegistrationResponse } from './auth.model';
import { PasswordService } from './common/password';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private passwordService: PasswordService) {}

  async register(user: any): Promise<RegistrationResponse> {
    return this.authenticate(user);
  }

  async login(user: User): Promise<LoginResponse> {
    return this.authenticate(user);
  }

  async decode(token: string) {
    return this.jwtService.decode(token);
  }

  async authenticate(user: User): Promise<{ user: User; token: string }> {
    const payload: { phone: User['phone']; email: User['email'] } = {
      phone: user.phone,
      email: user.email
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
