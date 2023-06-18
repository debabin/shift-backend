import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Seance } from './seance.entity';

@InputType('ScheduleInput')
@ObjectType()
export class Schedule {
  @Field(() => String)
  @ApiProperty({ description: 'Индентификатор фильма' })
  filmId: string;

  @ApiProperty()
  @Field(() => [[Seance]])
  @ApiProperty({ description: 'Недельное расписание' })
  schedule: Seance[][];
}
