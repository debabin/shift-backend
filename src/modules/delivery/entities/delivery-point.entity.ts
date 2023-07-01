import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('DeliveryPointInput')
@ObjectType()
export class DeliveryPoint {
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Индентификатор пункта' })
  id: string;

  @Field(() => String)
  @ApiProperty({ example: 'name', description: 'Название пункта' })
  name: string;

  @Field(() => Number)
  @ApiProperty({ example: 'latitude', description: 'Широта' })
  latitude: number;

  @Field(() => Number)
  @ApiProperty({ example: 'longitude', description: 'Долгота' })
  longitude: number;
}
