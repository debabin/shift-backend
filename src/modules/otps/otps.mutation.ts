import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DescribeContext } from '@/utils/decorators';
import { BaseResolver } from '@/utils/services';

import { OtpDto } from './dto';
import { Otp } from './entities';
import { OtpResponse } from './otps.model';
import { OtpsService } from './otps.service';

const RETRY_DELAY = 120000;

@Resolver('☄️ auth mutation')
@DescribeContext('OtpsMutation')
@Resolver(() => Otp)
export class OtpsMutation extends BaseResolver {
  constructor(private readonly otpsService: OtpsService) {
    super();
  }

  @Mutation(() => OtpResponse)
  async createOtp(@Args() otpDto: OtpDto) {
    const existingOtp = await this.otpsService.findOne({ phone: otpDto.phone });

    if (existingOtp) {
      const { retryDelay, created } = existingOtp;
      const now = new Date().getTime();

      if (new Date(created).getTime() + retryDelay > now)
        return this.wrapSuccess({ retryDelay: RETRY_DELAY - (now - new Date(created).getTime()) });
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    await this.otpsService.create({
      phone: `${otpDto.phone}`,
      code,
      retryDelay: RETRY_DELAY
    });

    return this.wrapSuccess({ retryDelay: RETRY_DELAY });
  }
}
