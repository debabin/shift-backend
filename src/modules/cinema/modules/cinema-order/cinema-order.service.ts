import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import type { CinemaOrderDocument } from './cinema-order.entity';
import { CinemaOrder } from './cinema-order.entity';

@Injectable()
export class CinemaOrderService extends BaseService<CinemaOrderDocument, CinemaOrder> {
  constructor(@InjectModel(CinemaOrder.name) private CinemaOrderModel: Model<CinemaOrderDocument>) {
    super(CinemaOrderModel);
  }
}
