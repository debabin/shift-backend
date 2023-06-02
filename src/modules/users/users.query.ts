import { Context, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';

import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { BaseResolver, AuthService } from '@/utils/services';

import { User } from './entities';
import { UserResponse } from './users.model';
import { UsersService } from './users.service';

@Resolver('💂‍♂️ users query')
@GqlAuthorizedOnly()
@DescribeContext('UsersQuery')
@Resolver(() => User)
export class UsersQuery extends BaseResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly i18nService: I18nService,
    private readonly authService: AuthService
  ) {
    super();
  }

  @Query(() => UserResponse)
  async me(@Context() context: { req: Request }) {
    const token = context.req.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    const user = await this.usersService.findOne({
      phone: decodedJwtAccessToken.phone
    });

    if (!user) {
      return this.wrapFail(this.i18nService.translate('error_not_found'));
    }

    return this.wrapSuccess({ user });
  }
}
