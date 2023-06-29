import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export enum Profession {
  ACTOR = 'ACTOR',
  DIRECTOR = 'DIRECTOR'
}

registerEnumType(Profession, {
  name: 'Profession'
});

@InputType('CinemaPersonInput')
@ObjectType()
export class FilmPerson {
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Идентификатор персоны' })
  id: string;

  @Field(() => [Profession])
  @ApiProperty({ description: 'Список профессий', enum: Profession })
  professions: Profession[];

  @Field(() => String)
  @ApiProperty({ description: 'Полное имя персоны' })
  fullName: string;
}
