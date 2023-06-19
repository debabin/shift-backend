import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/utils/services';

import { Film, FilmSeance, Ticket } from './entities';

@ObjectType()
export class FilmsResponse extends BaseResponse {
  @Field(() => [Film])
  @ApiProperty({ description: 'Фильмы', type: [Film] })
  films: Film[];
}

@ObjectType()
export class TicketsResponse extends BaseResponse {
  @Field(() => [Ticket])
  @ApiProperty({ description: 'Билеты', type: [Ticket] })
  tickets: Ticket[];
}

@ObjectType()
export class FilmResponse extends BaseResponse {
  @Field(() => Film)
  @ApiProperty({ description: 'Фильм', type: Film })
  film: Film;
}

@ObjectType()
export class ScheduleSeance extends FilmSeance {
  @Field(() => [Ticket])
  @ApiProperty({ description: 'Купленные билеты', type: [Ticket] })
  payedTickets: Ticket[];
}

@ObjectType()
export class Schedule {
  @Field(() => String)
  @ApiProperty({ description: 'Дата сеансов' })
  date: string;

  @Field(() => [ScheduleSeance])
  @ApiProperty({ description: 'Сеансы', type: [ScheduleSeance] })
  seances: ScheduleSeance[];
}

@ObjectType()
export class ScheduleResponse extends BaseResponse {
  @Field(() => [Schedule])
  @ApiProperty({ description: 'Расписание', type: [Schedule] })
  schedules: Schedule[];
}
