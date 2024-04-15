import { Controller, Get, Render } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { OTP_EXPIRED_TIME, OtpsService } from './modules/otps';

@ApiTags('pages')
@Controller()
export class AppController {
  constructor(private readonly otpsService: OtpsService) {}

  @Get('/')
  @ApiOperation({ summary: 'главная страница' })
  @Render('main.hbs')
  async main() {
    return {
      graphql: '/graphql',
      rest: '/api',
      otps: '/otps',
      tester: '/tester'
    };
  }

  @Get('/otps')
  @ApiOperation({ summary: 'страница с отп кодами' })
  @Render('otps.hbs')
  async otps() {
    const otps = await this.otpsService.find({});

    return {
      otps: otps.map((otp) => ({
        phone: otp.phone,
        code: otp.code,
        expiredDate: new Date(new Date(otp.created).getTime() + OTP_EXPIRED_TIME)
      }))
    };
  }
}
