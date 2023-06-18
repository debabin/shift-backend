import { BadRequestException, Body, Controller, Get, Param, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiHeader, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiAuthorizedOnly } from '@/utils/guards';
import { AuthService, BaseResolver, BaseResponse } from '@/utils/services';

import { User } from '../users';

import { FilmResponse, FilmsResponse, TicketsResponse } from './cinema.model';
import { CinemaService } from './cinema.service';
import { CancelTicketOrderDto, GetFilmDto } from './dto';
import { TicketStatus } from './entities';

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

  @Get('/film/:id')
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
}
