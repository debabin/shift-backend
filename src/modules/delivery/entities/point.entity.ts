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
}
