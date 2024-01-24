import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import { OTP_EXPIRED_TIME } from './constants';
import type { OtpDocument } from './entities';
import { Otp } from './entities';

@Injectable()
export class OtpsService extends BaseService<OtpDocument, Otp> {
  constructor(@InjectModel(Otp.name) private OtpModel: Model<OtpDocument>) {
    super(OtpModel);
  }

  @Cron('* */10 * * * *')
  async handleCron() {
    const otps = await this.find({});

    const expiredOtpsIds = otps
      .filter((otp) => new Date(otp.created).getTime() + OTP_EXPIRED_TIME < new Date().getTime())
      .map((otp) => otp._id);

    await this.delete({ _id: { $in: expiredOtpsIds } });
  }
}
