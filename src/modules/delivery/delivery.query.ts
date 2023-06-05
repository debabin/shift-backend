import { BadRequestException } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

import { points, packages } from '@/utils/constants';
import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { AuthService, BaseResolver } from '@/utils/services';

import { User } from '../users';

import {
  PointsResponse,
  PackageTypesResponse,
  DeliveriesResponse,
  DeliveryResponse
} from './delivery.model';
import { DeliveryService } from './delivery.service';
import { GetDeliveryDto } from './dto';

@Resolver('📦 delivery query')
@GqlAuthorizedOnly()
@DescribeContext('DeliveryQuery')
@Resolver()
export class DeliveryQuery extends BaseResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly deliveryService: DeliveryService
  ) {
    super();
  }

  @Query(() => PointsResponse)
  getDeliveryPoints(): PointsResponse {
    return this.wrapSuccess({ points });
  }

  @Query(() => PackageTypesResponse)
  getDeliveryPackageTypes(): PackageTypesResponse {
    return this.wrapSuccess({ packages });
  }

  @GqlAuthorizedOnly()
  @Query(() => DeliveriesResponse)
  async getDeliveries(@Context() context: { req: Request }): Promise<DeliveriesResponse> {
    const token = context.req.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const deliveries = await this.deliveryService.find({
      $or: [
        { 'sender.phone': decodedJwtAccessToken.phone },
        { 'receiver.phone': decodedJwtAccessToken.phone }
      ]
    });

    return this.wrapSuccess({ deliveries });
  }

  @GqlAuthorizedOnly()
  @Query(() => DeliveryResponse)
  async getDelivery(
    @Args() getDeliveryDto: GetDeliveryDto,
    @Context() context: { req: Request }
  ): Promise<DeliveryResponse> {
    const token = context.req.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const delivery = await this.deliveryService.findOne({
      _id: getDeliveryDto.orderId,
      $or: [
        { 'sender.phone': decodedJwtAccessToken.phone },
        { 'receiver.phone': decodedJwtAccessToken.phone }
      ]
    });

    if (!delivery) {
      throw new BadRequestException(this.wrapFail('Заказ не найден'));
    }

    return this.wrapSuccess({ delivery });
  }
}
