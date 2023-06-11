import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('FilmGenreInput')
@ObjectType()
export class FilmGenre {
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Индентификатор жанра' })
  id: string;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ example: 'genre', description: 'Название жанра' })
  name: string;
}
