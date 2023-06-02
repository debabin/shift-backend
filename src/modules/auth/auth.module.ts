import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { jwtOptions, PasswordModule } from './common/password';
import { JwtStrategy } from './common/strategies/jwt.strategy';

@Module({
  imports: [JwtModule.registerAsync(jwtOptions), PasswordModule],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService]
})
export class AuthModule {}
