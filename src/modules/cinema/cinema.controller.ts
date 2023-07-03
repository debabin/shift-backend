import { BadRequestException, Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiAuthorizedOnly } from '@/utils/guards';
import { getDDMMYYFormatDate } from '@/utils/helpers';
import { AuthService, BaseResolver, BaseResponse } from '@/utils/services';

import { User } from '../users';

import {
  CinemaOrdersResponse,
  FilmResponse,
  FilmsResponse,
  PaymentResponse,
  ScheduleResponse,
  TicketsResponse
} from './cinema.model';
import { CinemaService } from './cinema.service';
import { CancelCinemaOrderDto, CreateCinemaPaymentDto, GetFilmDto, GetScheduleDto } from './dto';
import { CinemaOrderService, CinemaOrderStatus } from './modules';

@ApiTags('🍿 cinema')
@Controller('/cinema')
export class CinemaController extends BaseResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly cinemaService: CinemaService,
    private readonly cinemaOrderService: CinemaOrderService
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
  @Put('/orders/cancel')
  @ApiOperation({ summary: 'отменить заказ' })
  @ApiResponse({
    status: 200,
    description: 'order cancel',
    type: BaseResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async cancelCinemaOrder(
    @Body() cancelCinemaOrderDto: CancelCinemaOrderDto
  ): Promise<BaseResponse> {
    const order = await this.cinemaOrderService.findOne({ _id: cancelCinemaOrderDto.orderId });

    if (!order) {
      throw new BadRequestException(this.wrapFail('Заказ не найден'));
    }

    if (order.status !== CinemaOrderStatus.PAYED) {
      throw new BadRequestException(this.wrapFail('Заказ нельзя отменить'));
    }

    const updatedTickets = await this.cinemaService.delete({
      _id: { $in: order.tickets.map((ticket) => ticket._id) }
    });

    await this.cinemaOrderService.updateOne(
      { _id: cancelCinemaOrderDto.orderId },
      { $set: { status: CinemaOrderStatus.CANCELED, tickets: updatedTickets } }
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

  @Post('/payment')
  @ApiOperation({ summary: 'Оплатить билеты' })
  @ApiResponse({
    status: 200,
    description: 'payment',
    type: PaymentResponse
  })
  async createCinemaPayment(
    @Args() createCinemaPaymentDto: CreateCinemaPaymentDto
  ): Promise<PaymentResponse> {
    const formatedTickets = createCinemaPaymentDto.tickets.map((ticket) => ({
      filmId: createCinemaPaymentDto.filmId,
      seance: createCinemaPaymentDto.seance,
      phone: createCinemaPaymentDto.person.phone,
      row: ticket.row,
      column: ticket.column
    }));

    const existedTickets = [];
    await Promise.all(
      formatedTickets.map(async (ticket) => {
        const existedTicket = await this.cinemaService.findOne({
          'seance.date': ticket.seance.date,
          'seance.time': ticket.seance.time,
          row: ticket.row,
          column: ticket.column
        });

        if (existedTicket) {
          existedTickets.push(ticket);
        }
      })
    );

    if (existedTickets.length) {
      throw new BadRequestException(
        this.wrapFail(
          `Данные билеты уже куплены: ${existedTickets
            .map(
              (ticket, index) =>
                `${index + 1}. ${ticket.seance.date} ${ticket.seance.time} ${ticket.row} ${
                  ticket.column
                }`
            )
            .join(' ')}`,
          {
            tickets: existedTickets.map((ticket) => ({
              seance: ticket.seance,
              row: ticket.row,
              column: ticket.column
            }))
          }
        )
      );
    }

    const tickets = await this.cinemaService.insertMany(formatedTickets);

    const orderId = Math.floor(Math.random() * 10 ** 6);
    const order = await this.cinemaOrderService.create({
      orderId,
      tickets,
      phone: createCinemaPaymentDto.person.phone,
      status: CinemaOrderStatus.PAYED
    });

    return this.wrapSuccess({ order });
  }

  @ApiAuthorizedOnly()
  @Get('/orders')
  @ApiOperation({ summary: 'получить все заказы билетов' })
  @ApiResponse({
    status: 200,
    description: 'orders',
    type: CinemaOrdersResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async getCinemaOrders(@Req() request: Request): Promise<CinemaOrdersResponse> {
    const token = request.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const orders = await this.cinemaOrderService.find({ phone: decodedJwtAccessToken.phone });

    return this.wrapSuccess({ orders });
  }
}
