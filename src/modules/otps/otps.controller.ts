import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver } from '@/utils/services';

import { RETRY_DELAY } from './constants';
import { CreateOtpDto } from './dto';
import { OtpResponse } from './otps.model';
import { OtpsService } from './otps.service';

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
  async createOtp(@Body() createOtpDto: CreateOtpDto): Promise<OtpResponse> {
    const existingOtp = await this.otpsService.findOne({ phone: createOtpDto.phone });

    if (existingOtp) {
      const { retryDelay, created } = existingOtp;
      const now = new Date().getTime();

      if (new Date(created).getTime() + retryDelay > now)
        return this.wrapSuccess({ retryDelay: RETRY_DELAY - (now - new Date(created).getTime()) });
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    await this.otpsService.create({
      phone: createOtpDto.phone,
      code,
      retryDelay: RETRY_DELAY
    });

    return this.wrapSuccess({ retryDelay: RETRY_DELAY });
  }
}
