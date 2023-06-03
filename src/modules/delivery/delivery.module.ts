import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from '@/utils/services';

import { DeliveryController } from './delivery.controller';
import { DeliveryMutation } from './delivery.mutation';
import { DeliveryQuery } from './delivery.query';
import { DeliveryService } from './delivery.service';
import { Delivery, DeliverySchema } from './entities';

@Module({
  controllers: [DeliveryController],
  imports: [
    AuthModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Delivery.name, schema: DeliverySchema }])
  ],
  providers: [DeliveryService, DeliveryQuery, DeliveryMutation],
  exports: [DeliveryService]
})
export class DeliveryModule {}
