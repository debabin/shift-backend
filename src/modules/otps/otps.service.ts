import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import { OtpDocument, Otp } from './entities';

export const OTP_EXPIRED_TIME = 10 * 60000;

@Injectable()
export class OtpsService extends BaseService<OtpDocument, Otp> {
  constructor(@InjectModel(Otp.name) private OtpModel: Model<OtpDocument>) {
    super(OtpModel);
  }

  @Cron('* */10 * * * *')
  async handleCron() {
    const otps = await this.find({});

    const exprideOtpsIds = otps
      .filter((otp) => new Date(otp.created).getTime() + OTP_EXPIRED_TIME < new Date().getTime())
      .map((otp) => otp._id);

    await this.delete({ _id: { $in: exprideOtpsIds } });
  }
}
