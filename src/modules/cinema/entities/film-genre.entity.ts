import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('FilmGenreInput')
@ObjectType()
export class FilmGenre {
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Идентификатор жанра' })
  id: string;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ example: 'genre', description: 'Название жанра' })
  name: string;
}
