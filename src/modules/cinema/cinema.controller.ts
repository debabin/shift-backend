import { BadRequestException, Body, Controller, Get, Param, Put, Res } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { ApiOperation, ApiHeader, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiAuthorizedOnly } from '@/utils/guards';
import { getDDMMYYFormatDate } from '@/utils/helpers';
import { AuthService, BaseResolver, BaseResponse } from '@/utils/services';

import { User } from '../users';

import {
  FilmResponse,
  FilmsResponse,
  TicketsResponse,
  ScheduleResponse,
  PaymentResponse
} from './cinema.model';
import { CinemaService } from './cinema.service';
import { CancelTicketOrderDto, CreateCinemaPaymentDto, GetFilmDto, GetScheduleDto } from './dto';
import { Ticket, TicketStatus } from './entities';

@ApiTags('🍿 cinema')
@Controller('/cinema')
export class CinemaController extends BaseResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly cinemaService: CinemaService
  ) {
    super();
  }

  @Get('/today')
  @ApiOperation({ summary: 'получить афишу фильмов' })
  @ApiResponse({
    status: 200,
    description: 'cinema today',
    type: FilmsResponse
  })
  getCinemaToday(): FilmsResponse {
    const films = this.cinemaService.getFilms();
    return this.wrapSuccess({ films });
  }

  @Get('/film/:filmId')
  @ApiOperation({ summary: 'получить фильм' })
  @ApiResponse({
    status: 200,
    description: 'film',
    type: FilmResponse
  })
  getFilm(@Param() params: GetFilmDto): FilmResponse {
    const film = this.cinemaService.getFilm(params.filmId);
    return this.wrapSuccess({ film });
  }

  @ApiAuthorizedOnly()
  @Get('/tickets')
  @ApiOperation({ summary: 'получить все билеты' })
  @ApiResponse({
    status: 200,
    description: 'orders',
    type: TicketsResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async getTickets(@Res() request: Request): Promise<TicketsResponse> {
    const token = request.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const tickets = await this.cinemaService.find({ phone: decodedJwtAccessToken.phone });

    return this.wrapSuccess({ tickets });
  }

  @ApiAuthorizedOnly()
  @Put('/tickets/cancel')
  @ApiOperation({ summary: 'отменить билет' })
  @ApiResponse({
    status: 200,
    description: 'ticket cancel',
    type: BaseResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async cancelTicket(@Body() cancelTicketOrderDto: CancelTicketOrderDto): Promise<BaseResponse> {
    const ticket = await this.cinemaService.findOne({ _id: cancelTicketOrderDto.ticketId });

    if (!ticket) {
      throw new BadRequestException(this.wrapFail('Билет не найден'));
    }

    if (ticket.status !== TicketStatus.PAYED || false) {
      throw new BadRequestException(this.wrapFail('Билет нельзя отменить'));
    }

    await this.cinemaService.updateOne(
      { _id: cancelTicketOrderDto.ticketId },
      { $set: { status: TicketStatus.CANCELED } }
    );

    return this.wrapSuccess();
  }

  @Get('/film/:filmId/schedule')
  @ApiOperation({ summary: 'Получить расписание фильма' })
  @ApiResponse({
    status: 200,
    description: 'schedule',
    type: ScheduleResponse
  })
  async getFilmSchedule(@Param() getScheduleDto: GetScheduleDto): Promise<ScheduleResponse> {
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

  @Get('/payment')
  @ApiOperation({ summary: 'Оплатить билеты' })
  @ApiResponse({
    status: 200,
    description: 'payment',
    type: PaymentResponse
  })
  async createCinemaPayment(
    @Args() createCinemaPaymentDto: CreateCinemaPaymentDto
  ): Promise<PaymentResponse> {
    const tickets: Omit<Ticket, '_id'>[] = createCinemaPaymentDto.tickets.map((ticket) => ({
      filmId: createCinemaPaymentDto.filmId,
      seance: createCinemaPaymentDto.seance,
      status: TicketStatus.PAYED,
      ...ticket
    }));

    await this.cinemaService.insertMany(tickets);

    return this.wrapSuccess({ orderId: '' });
  }
}
