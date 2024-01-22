import { BadRequestException, Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { OtpsService } from '@/modules/otps';
import { ApiAuthorizedOnly } from '@/utils/guards';
import { AuthService, BaseResolver } from '@/utils/services';

import { SignInDto, UpdateProfileDto } from './dto';
import type { User } from './entities';
import { SessionResponse, SignInResponse, UpdateProfileResponse } from './users.model';
import { UsersService } from './users.service';

@ApiTags('💂‍♂️ users')
@Controller('users')
export class UsersController extends BaseResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpsService: OtpsService,
    private readonly authService: AuthService
  ) {
    super();
  }

  @Post('/signin')
  @ApiOperation({ summary: 'авторизация' })
  @ApiResponse({
    status: 200,
    description: 'signin',
    type: SignInResponse
  })
  async signin(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    let user = await this.usersService.findOne({ phone: signInDto.phone });

    if (!user) {
      user = await this.usersService.create({ phone: signInDto.phone });
    }

    const otp = await this.otpsService.findOne({ phone: signInDto.phone, code: signInDto.code });

    if (!otp) {
      throw new BadRequestException(this.wrapFail('Неправильный отп код'));
    }

    await this.otpsService.delete({ _id: otp._id });
    const { token } = await this.authService.login(user);

    return this.wrapSuccess({ user, token });
  }

  @ApiAuthorizedOnly()
  @Patch('/profile')
  @ApiOperation({ summary: 'обновить профиль пользователя' })
  @ApiResponse({
    status: 200,
    description: 'update profile',
    type: UpdateProfileResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async updateProfile(@Body() updateProfileDto: UpdateProfileDto): Promise<UpdateProfileResponse> {
    const user = await this.usersService.findOne({ phone: updateProfileDto.phone });

    if (!user) {
      throw new BadRequestException(this.wrapFail('Пользователь не существует'));
    }

    const updatedUser = await this.usersService.findOneAndUpdate(
      { phone: user.phone },
      {
        $set: {
          firstname: updateProfileDto.profile.firstname,
          lastname: updateProfileDto.profile.lastname,
          middlename: updateProfileDto.profile.middlename
        }
      }
    );

    return this.wrapSuccess({ user: updatedUser });
  }

  @ApiAuthorizedOnly()
  @Get('/session')
  @ApiOperation({ summary: 'получить сессию пользователя' })
  @ApiResponse({
    status: 200,
    description: 'session',
    type: SessionResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async me(@Req() request: Request): Promise<SessionResponse> {
    const token = request.headers.authorization.split(' ')[1];

    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    const user = await this.usersService.findOne({
      phone: decodedJwtAccessToken.phone
    });

    if (!user) {
      throw new BadRequestException(this.wrapFail('Пользователь не найден'));
    }

    return this.wrapSuccess({ user });
  }
}
