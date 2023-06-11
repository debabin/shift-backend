import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('FilmUserRaitingInput')
@ObjectType()
export class FilmUserRaiting {
  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ example: '10', description: 'Рейтинг кинопоиск' })
  kinopoisk: string;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ example: '10', description: 'Рейтинг imdb' })
  imdb: string;
}
