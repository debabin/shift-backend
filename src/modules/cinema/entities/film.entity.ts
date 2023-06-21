import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Country } from '@/utils/common';

import { FilmPerson } from './film-person.entity';
import { FilmUserRaiting } from './film-user-raiting.entity';

export enum Rating {
  G = 'G',
  PG = 'PG',
  PG13 = 'PG13',
  N17 = 'N17',
  R = 'R'
}

registerEnumType(Rating, {
  name: 'Rating'
});

@InputType('FilmInput')
@ObjectType()
export class Film {
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Индентификатор персоны' })
  id: string;

  @ApiProperty()
  @ApiProperty({ description: 'Название фильма' })
  @Field(() => String)
  name: string;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ description: 'Оригинальное название' })
  originalName: string;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ description: 'Описание фильма' })
  description: string;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ description: 'Дата выхода' })
  releaseDate: string;

  @ApiProperty()
  @Field(() => [FilmPerson], { defaultValue: [] })
  @ApiProperty({ description: 'Актеры', type: [FilmPerson] })
  actors: FilmPerson[];

  @ApiProperty()
  @Field(() => [FilmPerson], { defaultValue: [] })
  @ApiProperty({ description: 'Режиссер', type: [FilmPerson] })
  directors: FilmPerson[];

  @ApiProperty()
  @Field(() => Number)
  @ApiProperty({ description: 'Продолжительность', type: Number })
  runtime: number;

  @ApiProperty()
  @Field(() => Rating)
  @ApiProperty({ description: 'Возрастное ограничение', enum: Rating })
  ageRating: Rating;

  @ApiProperty()
  @Field(() => [String], { defaultValue: [] })
  genres: string[];

  @ApiProperty()
  @Field(() => FilmUserRaiting)
  @ApiProperty({ description: 'Рейтинг пользователей', type: FilmUserRaiting })
  userRatings: FilmUserRaiting;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ description: 'Изображение фильма' })
  img: string;

  @ApiProperty()
  @Field(() => Country, { nullable: true })
  @ApiProperty({ description: 'Страна' })
  country?: Country;
}
