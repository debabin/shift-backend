import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CinemaOrder, CinemaOrderSchema } from './cinema-order.entity';
import { CinemaOrderService } from './cinema-order.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CinemaOrder.name, schema: CinemaOrderSchema }])],
  providers: [CinemaOrderService],
  exports: [CinemaOrderService]
})
export class CinemaOrderModule {}
