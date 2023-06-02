import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { WakeUpService } from './wakeup.service';

@Module({
  imports: [HttpModule],
  providers: [WakeUpService]
})
export class WakeUpModule {}
