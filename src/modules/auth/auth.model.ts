import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../users/entities';

@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  token?: string;
}

@ObjectType()
export class RegistrationResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field({ nullable: true })
  password?: string;
}
