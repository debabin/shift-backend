import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from '@/utils/services';

import { DeliveryController } from './delivery.controller';
import { DeliveryMutation } from './delivery.mutation';
import { DeliveryQuery } from './delivery.query';
import { DeliveryOrderModule } from './modules';

@Module({
  controllers: [DeliveryController],
  imports: [AuthModule, DeliveryOrderModule, ScheduleModule.forRoot()],
  providers: [DeliveryQuery, DeliveryMutation],
  exports: []
})
export class DeliveryModule {}
