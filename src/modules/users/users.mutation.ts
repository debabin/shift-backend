import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { OtpsService } from '@/modules/otps';
import { DescribeContext } from '@/utils/decorators';
import { AuthService, BaseResolver } from '@/utils/services';

import { SignInDto, UpdateProfileDto } from './dto';
import { User } from './entities';
import { SignInResponse, UpdateProfileResponse } from './users.model';
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

  @Mutation(() => SignInResponse)
  async signin(@Args() signInDto: SignInDto): Promise<SignInResponse> {
    const user = await this.usersService.findOne({ phone: signInDto.phone });

    if (!user) {
      throw new BadRequestException(this.wrapFail('Неправильный отп код'));
    }

    const otp = await this.otpsService.findOne({ phone: signInDto.phone, code: signInDto.code });

    if (!otp) {
      throw new BadRequestException(this.wrapFail('Неправильный отп код'));
    }

    await this.otpsService.delete({ _id: otp._id });
    const { token } = await this.authService.login(user);

    return this.wrapSuccess({ user, token });
  }

  @Mutation(() => UpdateProfileResponse)
  async updateProfile(@Args() updateProfileDto: UpdateProfileDto): Promise<UpdateProfileResponse> {
    const user = await this.usersService.findOne({ phone: updateProfileDto.phone });

    if (!user) {
      throw new BadRequestException(this.wrapFail('Пользователь не существует'));
    }

    await this.usersService.findOneAndUpdate(
      { phone: user.phone },
      {
        $set: {
          firstname: updateProfileDto.profile.firstname,
          lastname: updateProfileDto.profile.lastname,
          middlename: updateProfileDto.profile.middlename,
          email: updateProfileDto.profile.email,
          city: updateProfileDto.profile.city
        }
      }
    );

    return this.wrapSuccess();
  }
}
