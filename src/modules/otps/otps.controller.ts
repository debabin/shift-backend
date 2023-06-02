import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver } from '@/utils/services';

import { OtpDto } from './dto';
import { OtpResponse } from './otps.model';
import { OTP_EXPIRED_TIME, OtpsService } from './otps.service';

const RETRY_DELAY = 120000;

@ApiTags('☄️ otps')
@Controller()
export class OtpsController extends BaseResolver {
  constructor(private readonly otpsService: OtpsService) {
    super();
  }

  @Post('/auth/otp')
  @ApiOperation({ summary: 'создание отп кода' })
  @ApiResponse({
    status: 200,
    description: 'create otp',
    type: OtpResponse
  })
  async otp(@Body() otpDto: OtpDto): Promise<OtpResponse> {
    const existingOtp = await this.otpsService.findOne({ phone: otpDto.phone });

    if (existingOtp) {
      const { retryDelay, created } = existingOtp;
      const now = new Date().getTime();

      if (new Date(created).getTime() + retryDelay > now)
        return this.wrapSuccess({ retryDelay: RETRY_DELAY - (now - new Date(created).getTime()) });
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    await this.otpsService.create({
      phone: otpDto.phone,
      code,
      retryDelay: RETRY_DELAY
    });

    return this.wrapSuccess({ retryDelay: RETRY_DELAY });
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
