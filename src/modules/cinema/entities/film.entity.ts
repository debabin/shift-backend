import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { FilmPerson } from './film-person.entity';

@InputType('FilmInput')
@ObjectType()
export class Film {
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Индентификатор персоны' })
  id: string;

  //   @ApiProperty()
  //   @Field(() => ContentType)
  //   type: ContentType;

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
  @Field(() => Date)
  @ApiProperty({ description: 'Дата выхода' })
  releaseDate: Date;

  @ApiProperty()
  @Field(() => [FilmPerson], { nullable: true })
  @ApiProperty({ description: 'Актеры', type: [FilmPerson] })
  actors: FilmPerson[];

  //   @ApiProperty()
  //   @Field(() => Number)
  //   @Prop()
  //   runtime: number;

  //   @ApiProperty()
  //   @Field(() => String, { nullable: true })
  //   @Prop()
  //   chat: string;

  //   @ApiProperty()
  //   @Field(() => String, { nullable: true })
  //   @Prop()
  //   telegramUrl: string;

  //   @ApiProperty()
  //   @Field(() => [String], { nullable: true })
  //   @Prop()
  //   directors: string[];

  //   @ApiProperty()
  //   @Field(() => Rating)
  //   @Prop({ type: typeof Rating })
  //   ageRating: Rating;

  //   @ApiProperty()
  //   @Field(() => [String], { nullable: true })
  //   @Prop()
  //   genres: string[];

  //   @ApiProperty()
  //   @Field(() => [UserRating])
  //   @Prop({ default: [] })
  //   userRatings: UserRating[];

  //   @ApiProperty()
  //   @Field(() => Img, { nullable: true })
  //   @Prop()
  //   img?: Img;

  //   @ApiProperty()
  //   @Field(() => Country, { nullable: true })
  //   @Prop()
  //   country?: Country;
}
