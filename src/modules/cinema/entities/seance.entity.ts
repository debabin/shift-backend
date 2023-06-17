import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Place } from './place.entity';

@InputType('SeanceInput')
@ObjectType()
export class Seance {
  @Field(() => String)
  @ApiProperty({ description: 'Время сеанса' })
  time: string;

  @Field(() => String)
  @ApiProperty({ description: 'Название зала' })
  hallName: string;

  @Field(() => [[Place]])
  @ApiProperty({ description: 'Матрица мест' })
  places: Place[][];
}
