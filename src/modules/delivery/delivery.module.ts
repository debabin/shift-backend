import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

// import { Otp, OtpSchema } from './entities';
import { DeliveryController } from './delivery.controller';
import { DeliveryQuery } from './delivery.query';
// import { OtpsService } from './otps.service';

@Module({
  controllers: [DeliveryController],
  imports: [
    ScheduleModule.forRoot()
    // MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }])
  ],
  providers: [DeliveryQuery],
  exports: []
})
export class DeliveryModule {}
