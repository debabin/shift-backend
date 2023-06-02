import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { OtpsService } from '@/modules/otps';
import { BaseResolver, AuthService } from '@/utils/services';

import { SingInDto } from './dto';
import { User } from './entities';
import { UserResponse } from './users.model';
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

  @Post('/singin')
  @ApiOperation({ summary: 'авторизация' })
  @ApiResponse({
    status: 200,
    description: 'singin',
    type: UserResponse
  })
  async singin(@Body() singInDto: SingInDto, @Res() response: Response): Promise<UserResponse> {
    const user = await this.usersService.findOne({ phone: singInDto.phone });

    if (!user) {
      await this.usersService.create({ phone: singInDto.phone });
    }

    const otp = await this.otpsService.findOne({ phone: singInDto.phone, code: singInDto.code });

    if (!otp) {
      throw new HttpException('Неправильный отп код', HttpStatus.BAD_REQUEST);
    }

    await this.otpsService.delete({ _id: otp._id });
    const { token } = await this.authService.login(user);
    response.cookie('authorization', `Bearer ${token}`, { httpOnly: true, sameSite: true });

    return this.wrapSuccess({ user });
  }

  @Get('/session')
  @ApiOperation({ summary: 'получить сессию пользователя' })
  @ApiResponse({
    status: 200,
    description: 'session',
    type: UserResponse
  })
  async me(@Res() request: Request): Promise<UserResponse> {
    const token = request.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    const user = await this.usersService.findOne({
      phone: decodedJwtAccessToken.phone
    });

    if (!user) {
      return this.wrapFail('Пользователь не найден');
    }

    return this.wrapSuccess({ user });
  }
}
