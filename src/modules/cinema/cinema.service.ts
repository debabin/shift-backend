import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import { films, schedules } from './constants';
import { Ticket, TicketDocument } from './entities';

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

  getSchedules() {
    return schedules;
  }

  getFilmSchedule(filmId: string) {
    const currentDay = new Date().getDay();

    const schedules = this.getSchedules();
    const { schedule } = schedules.find((scheduleDataItem) => scheduleDataItem.filmId === filmId);

    if (currentDay === 0) return schedule;

    return schedule.slice(currentDay, schedule.length).concat(schedule.slice(0, currentDay));
  }
}
