import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '@/modules/users';
import { AuthModule } from '@/utils/services';

import { CinemaController } from './cinema.controller';
import { CinemaMutation } from './cinema.mutation';
import { CinemaQuery } from './cinema.query';
import { CinemaService } from './cinema.service';
import { Ticket, TicketSchema } from './entities';
import { CinemaOrderModule } from './modules';

@Module({
  controllers: [CinemaController],
  imports: [
    AuthModule,
    UsersModule,
    CinemaOrderModule,
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }])
  ],
  providers: [CinemaService, CinemaMutation, CinemaQuery],
  exports: [CinemaService]
})
export class CinemaModule {}
