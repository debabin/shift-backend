import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { FilmHallCell } from './film-hall-cell.entity';

@InputType('FilmHallInput')
@ObjectType()
export class FilmHall {
  @Field(() => String)
  @ApiProperty({ example: 'name', description: 'Название зала' })
  name: string;

  @Field(() => [[FilmHallCell]], {
    defaultValue: [
      [
        { type: '', price: 10 },
        { type: '', price: 10 }
      ],
      [
        { type: '', price: 10 },
        { type: '', price: 10 }
      ]
    ]
  })
  @ApiProperty({ description: 'Места в зале', type: [[FilmHallCell]] })
  places: FilmHallCell[][];
}
