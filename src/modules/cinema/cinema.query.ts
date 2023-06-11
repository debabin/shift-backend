import { BadRequestException } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { AuthService, BaseResolver } from '@/utils/services';

import { User } from '../users';

import { FilmResponse, FilmsResponse, TicketsResponse } from './cinema.model';
import { CinemaService } from './cinema.service';
import { GetFilmDto } from './dto';

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
  async getFilms(): Promise<FilmsResponse> {
    const films = this.cinemaService.getFilms();
    return this.wrapSuccess({ films });
  }

  @Query(() => FilmResponse)
  async getFilm(@Args() getFilmDto: GetFilmDto): Promise<FilmResponse> {
    const film = this.cinemaService.getFilm(getFilmDto.filmId);
    return this.wrapSuccess({ film });
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
