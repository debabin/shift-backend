import { InputType, ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export enum FilmHallCellStatus {
  DEFAULT = 'DEFAULT',
  PAYED = 'PAYED'
}

registerEnumType(FilmHallCellStatus, {
  name: 'FilmHallCellStatus'
});

export enum FilmHallCellType {
  ECONOM = 'ECONOM',
  COMFORT = 'COMFORT'
}

registerEnumType(FilmHallCellType, {
  name: 'FilmHallCellType'
});

@InputType('FilmHallCellInput')
@ObjectType()
export class FilmHallCell {
  @Field(() => FilmHallCellType)
  @ApiProperty({ description: 'Тип места в зале', enum: FilmHallCellType })
  type: FilmHallCellType;

  @ApiProperty()
  @Field(() => Number)
  @ApiProperty({ example: 100, description: 'Цена места в зале' })
  price: number;
}
