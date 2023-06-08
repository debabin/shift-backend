import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/utils/services';

import { Film } from './entities';

@ObjectType()
export class FilmsResponse extends BaseResponse {
  @Field(() => [Film])
  @ApiProperty({ description: 'Фильмы', type: [Film] })
  films: Film[];
}
