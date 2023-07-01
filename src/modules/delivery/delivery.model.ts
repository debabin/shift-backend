import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/utils/services';

import { DeliveryPoint, DeliveryPackageType } from './entities';
import { DeliveryOption } from './entities/delivery-option.entity';
import { DeliveryOrder } from './modules';

@ObjectType()
export class DeliveryPointsResponse extends BaseResponse {
  @Field(() => [DeliveryPoint])
  @ApiProperty({ description: 'Пункты доставки', type: [DeliveryPoint] })
  points: DeliveryPoint[];
}

@ObjectType()
export class DeliveryPackageTypesResponse extends BaseResponse {
  @Field(() => [DeliveryPackageType])
  @ApiProperty({ description: 'Типы ', type: [DeliveryPackageType] })
  packages: DeliveryPackageType[];
}

@ObjectType()
export class DeliverResponse extends BaseResponse {
  @Field(() => DeliveryOrder)
  @ApiProperty({ description: 'Доставка', type: DeliveryOrder })
  order: DeliveryOrder;
}

@ObjectType()
export class DeliveryOrdersResponse extends BaseResponse {
  @Field(() => [DeliveryOrder])
  @ApiProperty({ description: 'Доставки', type: [DeliveryOrder] })
  orders: DeliveryOrder[];
}

@ObjectType()
export class DeliveryOrderResponse extends BaseResponse {
  @Field(() => DeliveryOrder)
  @ApiProperty({ description: 'Доставка', type: DeliveryOrder })
  order: DeliveryOrder;
}

@ObjectType()
export class CalculateDeliveryResponse extends BaseResponse {
  @Field(() => [DeliveryOption])
  @ApiProperty({ description: 'Опции доставки', type: [DeliveryOption] })
  options: DeliveryOption[];
}
