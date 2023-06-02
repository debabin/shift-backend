import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { Otp, OtpSchema } from './entities';
import { OtpsController } from './otps.controller';
import { OtpsMutation } from './otps.mutation';
import { OtpsService } from './otps.service';

@Module({
  controllers: [OtpsController],
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }])
  ],
  providers: [OtpsService, OtpsMutation],
  exports: [OtpsService]
})
export class OtpsModule {}
