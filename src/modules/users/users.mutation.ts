import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';

import { AuthService } from '@/modules/auth';
import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { BaseResolver } from '@/utils/services';

import { SingUpDto } from './dto';
import { User } from './entities';
import { UserResponse } from './users.model';
import { UsersService } from './users.service';

@Resolver('💂‍♂️ users mutation')
@GqlAuthorizedOnly()
@DescribeContext('UsersMutation')
@Resolver(() => User)
export class UsersMutation extends BaseResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly i18nService: I18nService,
    private readonly authService: AuthService
  ) {
    super();
  }

  @Mutation(() => UserResponse)
  async singup(@Args() singUpDto: SingUpDto, @Context() context: { res: Response }) {
    const existingUser = await this.usersService.findOne({ phone: singUpDto.phone });

    if (existingUser) {
      return this.wrapFail(this.i18nService.translate('error_not_found'));
    }

    const user = await this.usersService.create(singUpDto);

    const { token } = await this.authService.register(user);
    context.res.cookie('authorization', `Bearer ${token}`, { httpOnly: true, sameSite: true });

    return this.wrapSuccess({ user });
  }
}
