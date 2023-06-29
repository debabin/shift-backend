import { BadRequestException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';

import { OtpsService } from '@/modules/otps';
import { DescribeContext } from '@/utils/decorators';
import { BaseResolver, AuthService } from '@/utils/services';

import { SignInDto } from './dto';
import { User } from './entities';
import { UserResponse } from './users.model';
import { UsersService } from './users.service';

@Resolver('💂‍♂️ users mutation')
@DescribeContext('UsersMutation')
@Resolver(() => User)
export class UsersMutation extends BaseResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpsService: OtpsService,
    private readonly authService: AuthService
  ) {
    super();
  }

  @Mutation(() => UserResponse)
  async signIn(
    @Args() signInDto: SignInDto,
    @Context() context: { res: Response }
  ): Promise<UserResponse> {
    const user = await this.usersService.findOne({ phone: signInDto.phone });

    if (!user) {
      await this.usersService.create({ phone: signInDto.phone });
    }

    const otp = await this.otpsService.findOne({ phone: signInDto.phone, code: signInDto.code });

    if (!otp) {
      throw new BadRequestException(this.wrapFail('Неправильный отп код'));
    }

    await this.otpsService.delete({ _id: otp._id });
    const { token } = await this.authService.login(user);
    context.res.cookie('authorization', `Bearer ${token}`);

    return this.wrapSuccess({ user });
  }
}
