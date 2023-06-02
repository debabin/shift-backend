import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';

import { BaseResolver } from '@/utils/services';

import { AuthService } from '../auth';

import { SingUpDto } from './dto';
import { User } from './entities';
import { UserResponse } from './users.model';
import { UsersService } from './users.service';

@ApiTags('💂‍♂️ users')
@Controller('users')
export class UsersController extends BaseResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly i18nService: I18nService,
    private readonly authService: AuthService
  ) {
    super();
  }

  @Post('/singup')
  @ApiHeader({
    name: 'authorization',
    description: 'Авторизованный header'
  })
  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({
    status: 200,
    description: 'singup',
    type: UserResponse
  })
  async singup(@Body() singUpDto: SingUpDto, @Res() response: Response) {
    const existingUser = await this.usersService.findOne({ phone: singUpDto.phone });

    if (existingUser) {
      return this.wrapFail(this.i18nService.translate('error_not_found'));
    }

    const user = await this.usersService.create(singUpDto);

    const { token } = await this.authService.register(user);
    response.cookie('authorization', `Bearer ${token}`, { httpOnly: true, sameSite: true });

    return this.wrapSuccess({ user });
  }

  @Get('/')
  @ApiOperation({ summary: 'Получить все пиццы' })
  @ApiResponse({
    status: 200,
    description: 'Users',
    type: [User]
  })
  getAllUsers() {
    return [];
  }
}
