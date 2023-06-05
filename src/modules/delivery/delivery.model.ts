import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/utils/services';

import { Point, PackageType, Delivery } from './entities';
import { DeliveryOption } from './entities/delivery-option.entity';

@ObjectType()
export class PointsResponse extends BaseResponse {
  @Field(() => [Point])
  @ApiProperty({ description: 'Пункты доставки', type: [Point] })
  points: Point[];
}

@ObjectType()
export class PackageTypesResponse extends BaseResponse {
  @Field(() => [PackageType])
  @ApiProperty({ description: 'Типы ', type: [PackageType] })
  packages: PackageType[];
}

@ObjectType()
export class DeliverResponse extends BaseResponse {
  @Field(() => Delivery)
  @ApiProperty({ description: 'Доставка', type: Delivery })
  order: Delivery;
}

@ObjectType()
export class DeliveriesResponse extends BaseResponse {
  @Field(() => [Delivery])
  @ApiProperty({ description: 'Доставки', type: [Delivery] })
  deliveries: Delivery[];
}

@ObjectType()
export class DeliveryResponse extends BaseResponse {
  @Field(() => Delivery)
  @ApiProperty({ description: 'Доставка', type: Delivery })
  delivery: Delivery;
}

@ObjectType()
export class CalculateDeliveryResponse extends BaseResponse {
  @Field(() => [DeliveryOption])
  @ApiProperty({ description: 'Опции доставки', type: [DeliveryOption] })
  options: DeliveryOption[];
}
