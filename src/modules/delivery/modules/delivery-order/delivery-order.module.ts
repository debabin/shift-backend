import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DeliveryOrderSchema, DeliveryOrder } from './delivery-order.entity';
import { DeliveryOrderService } from './delivery-order.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: DeliveryOrder.name, schema: DeliveryOrderSchema }])],
  providers: [DeliveryOrderService],
  exports: [DeliveryOrderService]
})
export class DeliveryOrderModule {}
