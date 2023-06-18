import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import { Ticket, TicketDocument } from './entities/ticket.entity';
import { films, scheduleData } from './constants';

@Injectable()
export class CinemaService extends BaseService<TicketDocument, Ticket> {
  constructor(@InjectModel(Ticket.name) private TicketModel: Model<TicketDocument>) {
    super(TicketModel);
  }

  getFilms() {
    return films;
  }

  getFilm(id: string) {
    const films = this.getFilms();
    return films.find((film) => film.id === id);
  }

  getScheduleData() {
    return scheduleData;
  }

  getScheduleByFilm(id: string) {
    const date = new Date();
    const currentDay = date.getDay();

    const scheduleData = this.getScheduleData();
    const scheduleByFilm = scheduleData.find(
      (scheduleDataItem) => scheduleDataItem.filmId === id
    ).schedule;

    if (currentDay === 0) return scheduleByFilm;

    return scheduleByFilm
      .slice(currentDay, scheduleByFilm.length)
      .concat(scheduleByFilm.slice(0, currentDay));
  }
}
