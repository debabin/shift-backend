import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ScheduleModule } from '@nestjs/schedule';

// import { AuthModule } from '@/utils/services';

import { DeliveryController } from './cinema.controller';
import { CinemaQuery } from './cinema.query';
// import { DeliveryService } from './delivery.service';

@Module({
  controllers: [DeliveryController],
  imports: [
    // AuthModule,
    // MongooseModule.forFeature([{ name: Delivery.name, schema: DeliverySchema }])
  ],
  providers: [CinemaQuery],
  exports: []
})
export class CinemaModule {}
