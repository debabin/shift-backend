import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import { Ticket, TicketDocument } from './entities/ticket.entity';

@Injectable()
export class CinemaService extends BaseService<TicketDocument, Ticket> {
  constructor(@InjectModel(Ticket.name) private TicketModel: Model<TicketDocument>) {
    super(TicketModel);
  }

  getFilms() {
    return [];
  }

  getFilm(id: string) {
    const films = this.getFilms();
    return films.find((film) => film.id === id);
  }
}
