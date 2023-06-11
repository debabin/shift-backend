import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import { DeliveryDocument, Delivery, DeliveryStatus } from './entities';

export const OTP_EXPIRED_TIME = 10 * 60000;

@Injectable()
export class DeliveryService extends BaseService<DeliveryDocument, Delivery> {
  constructor(@InjectModel(Delivery.name) private DeliveryModel: Model<DeliveryDocument>) {
    super(DeliveryModel);
  }

  @Cron('0 0 */5 * * *')
  async handleCron() {
    const deliveries = await this.find({
      $and: [
        { status: { $not: DeliveryStatus.SUCCESS } },
        { status: { $not: DeliveryStatus.CANCELED } }
      ]
    });

    const randomDeliveries = deliveries.filter(() => Math.random() < 0.3);

    await this.updateMany(
      { _id: { $in: randomDeliveries.map((delivery) => delivery._id) } },
      { $inc: { status: 1 } }
    );
  }
}
