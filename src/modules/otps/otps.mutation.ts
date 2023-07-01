import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DescribeContext } from '@/utils/decorators';
import { BaseResolver } from '@/utils/services';

import { RETRY_DELAY } from './constants';
import { CreateOtpDto } from './dto';
import { Otp } from './entities';
import { OtpResponse } from './otps.model';
import { OtpsService } from './otps.service';

@Resolver('☄️ otps mutation')
@DescribeContext('OtpsMutation')
@Resolver(() => Otp)
export class OtpsMutation extends BaseResolver {
  constructor(private readonly otpsService: OtpsService) {
    super();
  }

  @Mutation(() => OtpResponse)
  async createOtp(@Args() createOtpDto: CreateOtpDto) {
    const existingOtp = await this.otpsService.findOne({ phone: createOtpDto.phone });

    if (existingOtp) {
      const { retryDelay, created } = existingOtp;
      const now = new Date().getTime();

      if (new Date(created).getTime() + retryDelay > now)
        return this.wrapSuccess({ retryDelay: RETRY_DELAY - (now - new Date(created).getTime()) });
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    await this.otpsService.create({
      phone: `${createOtpDto.phone}`,
      code,
      retryDelay: RETRY_DELAY
    });

    return this.wrapSuccess({ retryDelay: RETRY_DELAY });
  }
}
