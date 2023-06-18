import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { FilmHall } from './film-hall.entity';

@InputType('SeanceInput')
@ObjectType()
export class Seance {
  @Field(() => String)
  @ApiProperty({ description: 'Время сеанса' })
  time: string;

  @Field(() => FilmHall)
  @ApiProperty({ description: 'Зал сеанса', type: FilmHall })
  hall: FilmHall;
}
