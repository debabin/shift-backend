import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '@/modules/auth';

import { User, UserSchema } from './entities';
import { UsersController } from './users.controller';
import { UsersMutation } from './users.mutation';
import { UsersQuery } from './users.query';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [AuthModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, UsersQuery, UsersMutation],
  exports: [UsersService]
})
export class UsersModule {}
