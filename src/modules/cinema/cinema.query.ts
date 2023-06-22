import { BadRequestException } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { getDDMMYYFormatDate } from '@/utils/helpers';
import { AuthService, BaseResolver } from '@/utils/services';

import { User } from '../users';

import { FilmResponse, FilmsResponse, ScheduleResponse, TicketsResponse } from './cinema.model';
import { CinemaService } from './cinema.service';
import { GetFilmDto, GetScheduleDto } from './dto';
import { TicketStatus } from './entities';

@Resolver('🍿 cinema query')
@DescribeContext('CinemaQuery')
@Resolver()
export class CinemaQuery extends BaseResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly cinemaService: CinemaService
  ) {
    super();
  }

  @Query(() => FilmsResponse)
  getCinemaToday(): FilmsResponse {
    const films = this.cinemaService.getFilms();
    return this.wrapSuccess({ films });
  }

  @Query(() => FilmResponse)
  getFilm(@Args() getFilmDto: GetFilmDto): FilmResponse {
    const film = this.cinemaService.getFilm(getFilmDto.filmId);
    return this.wrapSuccess({ film });
  }

  @Query(() => ScheduleResponse)
  async getFilmSchedule(@Args() getScheduleDto: GetScheduleDto): Promise<ScheduleResponse> {
    const filmSchedule = this.cinemaService.getFilmSchedule(getScheduleDto.filmId);
    const tickets = await this.cinemaService.find({
      status: TicketStatus.PAYED,
      'seance.date': { $gt: new Date().getTime() }
    });

    const updatedFilmSchedule = filmSchedule.reduce((acc, schedule, index) => {
      const formattedDate = getDDMMYYFormatDate(index);

      const seances = schedule.map((element) => {
        const payedTickets = tickets.filter(
          (ticket) =>
            ticket.seance.date === formattedDate &&
            ticket.seance.time === element.time &&
            ticket.filmId === getScheduleDto.filmId
        );

        return {
          ...element,
          payedTickets
        };
      });

      acc.push({ date: formattedDate, seances });

      return acc;
    }, [] as ScheduleResponse['schedules']);

    return this.wrapSuccess({ schedules: updatedFilmSchedule });
  }

  @GqlAuthorizedOnly()
  @Query(() => TicketsResponse)
  async getTickets(@Context() context: { req: Request }): Promise<TicketsResponse> {
    const token = context.req.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const tickets = await this.cinemaService.find({ phone: decodedJwtAccessToken.phone });

    return this.wrapSuccess({ tickets });
  }
}
