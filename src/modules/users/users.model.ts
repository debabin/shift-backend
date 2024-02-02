import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/utils/services';

import { User } from './entities';

@ObjectType()
export class SessionResponse extends BaseResponse {
  @Field(() => User)
  @ApiProperty({ description: 'Пользователь', type: User })
  user: User;
}

@ObjectType()
export class SignInResponse extends BaseResponse {
  @Field(() => User)
  @ApiProperty({ description: 'Пользователь', type: User })
  user: User;

  @Field(() => String)
  @ApiProperty({ description: 'Пользовательский токен' })
  token: string;
}

@ObjectType()
export class UpdateProfileResponse extends BaseResponse {
  @Field(() => User)
  @ApiProperty({ description: 'Пользователь', type: User })
  user: User;
}
