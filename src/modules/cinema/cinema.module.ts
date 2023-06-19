import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '@/utils/services';

import { CinemaController } from './cinema.controller';
import { CinemaMutation } from './cinema.mutation';
import { CinemaQuery } from './cinema.query';
import { CinemaService } from './cinema.service';
import { Ticket, TicketSchema } from './entities';

@Module({
  controllers: [CinemaController],
  imports: [AuthModule, MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }])],
  providers: [CinemaService, CinemaMutation, CinemaQuery],
  exports: [CinemaService]
})
export class CinemaModule {}
