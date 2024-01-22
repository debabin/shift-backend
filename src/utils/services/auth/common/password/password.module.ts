import { Module } from '@nestjs/common';
import type { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

import { PasswordService } from './password.service';

export const JWT_SECRET_VALUE = Symbol('JWT_SECRET_VALUE');
export const jwtOptions: JwtModuleAsyncOptions = {
  useFactory: () => {
    if (!process.env.JWT_SECRET) {
      throw new Error('env.JWT_SECRET is not defined');
    }

    return {
      secret: process.env.JWT_SECRET,
      signOptions: {}
    };
  }
};

@Module({
  imports: [JwtModule.registerAsync(jwtOptions)],
  providers: [PasswordService],
  exports: [PasswordService]
})
export class PasswordModule {}
