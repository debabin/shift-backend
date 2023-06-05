import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('PointInput')
@ObjectType()
export class Point {
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Индентификатор пункта' })
  id: string;

  @Field(() => String)
  @ApiProperty({ example: 'name', description: 'Название пункта' })
  name: string;

  @Field(() => Number)
  @ApiProperty({ example: 'latitude', description: 'Широта' })
  latitude: number;

  @Field(() => String)
  @ApiProperty({ example: 'longitude', description: 'Долгота' })
  longitude: number;
}
