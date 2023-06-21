import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export enum DeliveryOptionType {
  DEFAULT = 'DEFAULT',
  EXPRESS = 'EXPRESS'
}
registerEnumType(DeliveryOptionType, {
  name: 'DeliveryOptionType'
});

@InputType('DeliveryOpttionInput')
@ObjectType()
export class DeliveryOption {
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Индентификатор опции доставки' })
  id: string;

  @Field(() => Number)
  @ApiProperty({ example: 10000, description: 'Цена доставки в копейках' })
  price: number;

  @Field(() => Number)
  @ApiProperty({ example: 2, description: 'Количество дней доставки' })
  days: number;

  @Field(() => String)
  @ApiProperty({ example: 'name', description: 'Название опции отправки' })
  name: string;

  @Field(() => DeliveryOptionType)
  @ApiProperty({ example: 'type', description: 'Тип доставки', enum: DeliveryOptionType })
  type: DeliveryOptionType;
}
