import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/utils/services';

import { Point } from './entities';

@ObjectType()
export class PointsResponse extends BaseResponse {
  @Field(() => [Point])
  @ApiProperty({ description: 'Пункты доставки', type: [Point] })
  points: Point[];
}

@ObjectType()
export class PackageTypesResponse extends BaseResponse {
  @Field(() => [Point])
  @ApiProperty({ description: 'Пункты доставки', type: [Point] })
  points: Point[];
}
