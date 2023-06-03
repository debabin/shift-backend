import { BadRequestException, Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiAuthorizedOnly } from '@/utils';
import { AuthService, BaseResolver } from '@/utils/services';

import { User } from '../users';

import {
  PointsResponse,
  PackageTypesResponse,
  DeliverResponse,
  DeliveriesResponse,
  DeliveryResponse
} from './delivery.model';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryOrderDto, GetDeliveryDto } from './dto';
import { DeliveryStatus } from './entities';

@ApiTags('📦 delivery')
@Controller('/delivery')
export class DeliveryController extends BaseResolver {
  constructor(
    private readonly deliveryService: DeliveryService,
    private readonly authService: AuthService
  ) {
    super();
  }

  @Get('/points')
  @ApiOperation({ summary: 'получить пункты выдачи' })
  @ApiResponse({
    status: 200,
    description: 'points',
    type: PointsResponse
  })
  async getPoints(): Promise<PointsResponse> {
    return this.wrapSuccess({ points: [] });
  }

  @Get('/package/types')
  @ApiOperation({ summary: 'получить типы посылок' })
  @ApiResponse({
    status: 200,
    description: 'package types',
    type: PackageTypesResponse
  })
  async getPackageTypes(): Promise<PointsResponse> {
    return this.wrapSuccess({ points: [] });
  }

  @Post('/order')
  @ApiOperation({ summary: 'создание заявки доставки' })
  @ApiResponse({
    status: 200,
    description: 'order',
    type: DeliverResponse
  })
  async createOrder(
    @Body() createDeliveryOrderDto: CreateDeliveryOrderDto
  ): Promise<DeliverResponse> {
    const order = await this.deliveryService.create({
      ...createDeliveryOrderDto,
      status: DeliveryStatus.IN_PROCESSING
    });

    return this.wrapSuccess({ order });
  }

  @ApiAuthorizedOnly()
  @Get('/orders')
  @ApiOperation({ summary: 'получить все заявки на доставку' })
  @ApiResponse({
    status: 200,
    description: 'orders',
    type: DeliveriesResponse
  })
  async getDeliveries(@Res() request: Request): Promise<DeliveriesResponse> {
    const token = request.headers.authorization.split(' ')[1];
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

  @ApiAuthorizedOnly()
  @Get('/orders/:orderId')
  @ApiOperation({ summary: 'получить заявку на доставку' })
  @ApiResponse({
    status: 200,
    description: 'order',
    type: DeliveriesResponse
  })
  async getDelivery(
    @Param() params: GetDeliveryDto,
    @Res() request: Request
  ): Promise<DeliveryResponse> {
    const token = request.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const delivery = await this.deliveryService.findOne({
      _id: params.orderId,
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
