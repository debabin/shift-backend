import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import { DeliveryDocument, Delivery } from './entities';

export const OTP_EXPIRED_TIME = 10 * 60000;

@Injectable()
export class DeliveryService extends BaseService<DeliveryDocument, Delivery> {
  constructor(@InjectModel(Delivery.name) private OtpModel: Model<DeliveryDocument>) {
    super(OtpModel);
  }
}
