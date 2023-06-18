import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('PlaceInput')
@ObjectType()
export class Place {
  @Field(() => Number)
  @ApiProperty({ description: 'Цена места' })
  price: number;

  @Field(() => String)
  @ApiProperty({ description: 'Тип места' })
  type: string;
}
