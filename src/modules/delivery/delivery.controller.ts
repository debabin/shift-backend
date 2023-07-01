import { randomUUID } from 'crypto';

import { BadRequestException, Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiAuthorizedOnly } from '@/utils/guards';
import { getDistance } from '@/utils/helpers';
import { AuthService, BaseResolver, BaseResponse } from '@/utils/services';

import { User } from '../users';

import { packages, points } from './constants';
import {
  DeliveryPointsResponse,
  DeliveryPackageTypesResponse,
  DeliverResponse,
  DeliveryOrdersResponse,
  DeliveryOrderResponse,
  CalculateDeliveryResponse
} from './delivery.model';
import {
  CalculateDeliveryDto,
  CancelDeliveryOrderDto,
  CreateDeliveryOrderDto,
  GetDeliveryOrderDto
} from './dto';
import { DeliveryOption, DeliveryOptionType } from './entities';
import { DeliveryOrderService, DeliveryStatus } from './modules';

@ApiTags('📦 delivery')
@Controller('/delivery')
export class DeliveryController extends BaseResolver {
  constructor(
    private readonly deliveryOrderService: DeliveryOrderService,
    private readonly authService: AuthService
  ) {
    super();
  }

  @Get('/points')
  @ApiOperation({ summary: 'получить пункты выдачи' })
  @ApiResponse({
    status: 200,
    description: 'points',
    type: DeliveryPointsResponse
  })
  getPoints(): DeliveryPointsResponse {
    return this.wrapSuccess({ points });
  }

  @Get('/package/types')
  @ApiOperation({ summary: 'получить типы посылок' })
  @ApiResponse({
    status: 200,
    description: 'package types',
    type: DeliveryPackageTypesResponse
  })
  getPackageTypes(): DeliveryPackageTypesResponse {
    return this.wrapSuccess({ packages });
  }

  @Post('/calc')
  @ApiOperation({ summary: 'расчет доставки' })
  @ApiResponse({
    status: 200,
    description: 'calc',
    type: CalculateDeliveryResponse
  })
  async calculateDelivery(
    @Body() calculateDeliveryDto: CalculateDeliveryDto
  ): Promise<CalculateDeliveryResponse> {
    const distancePrice = getDistance(
      calculateDeliveryDto.receiverPoint.latitude,
      calculateDeliveryDto.receiverPoint.longitude,
      calculateDeliveryDto.senderPoint.latitude,
      calculateDeliveryDto.senderPoint.longitude
    );

    const sizeWeightPrice =
      (calculateDeliveryDto.package.length *
        calculateDeliveryDto.package.weight *
        calculateDeliveryDto.package.height *
        calculateDeliveryDto.package.width) /
      10000;

    const price = Math.round((distancePrice + sizeWeightPrice) * 100);
    const days = Math.floor(Math.random() * 7) + 2;
    const options: DeliveryOption[] = [
      {
        id: randomUUID(),
        days,
        price,
        name: 'стандартная доставка',
        type: DeliveryOptionType.DEFAULT
      },
      {
        id: randomUUID(),
        price: price * 2,
        days: Math.floor(days / 2),
        name: 'эксперсс доставка',
        type: DeliveryOptionType.EXPRESS
      }
    ];

    return this.wrapSuccess({ options });
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
    const order = await this.deliveryOrderService.create({
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
    type: DeliveryOrdersResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async getDeliveries(@Req() request: Request): Promise<DeliveryOrdersResponse> {
    const token = request.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const orders = await this.deliveryOrderService.find({
      $or: [
        { 'sender.phone': decodedJwtAccessToken.phone },
        { 'receiver.phone': decodedJwtAccessToken.phone }
      ]
    });

    return this.wrapSuccess({ orders });
  }

  @ApiAuthorizedOnly()
  @Get('/orders/:orderId')
  @ApiOperation({ summary: 'получить заявку на доставку' })
  @ApiResponse({
    status: 200,
    description: 'order',
    type: DeliveryOrderResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async getDelivery(
    @Param() getDeliveryOrderDto: GetDeliveryOrderDto,
    @Req() request: Request
  ): Promise<DeliveryOrderResponse> {
    const token = request.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const order = await this.deliveryOrderService.findOne({
      _id: getDeliveryOrderDto.orderId,
      $or: [
        { 'sender.phone': decodedJwtAccessToken.phone },
        { 'receiver.phone': decodedJwtAccessToken.phone }
      ]
    });

    if (!order) {
      throw new BadRequestException(this.wrapFail('Заказ не найден'));
    }

    return this.wrapSuccess({ order });
  }

  @ApiAuthorizedOnly()
  @Put('/orders/cancel')
  @ApiOperation({ summary: 'отменить доставку' })
  @ApiResponse({
    status: 200,
    description: 'order cancel',
    type: BaseResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async cancelDeliveryOrder(
    @Body() cancelDeliveryOrderDto: CancelDeliveryOrderDto
  ): Promise<BaseResponse> {
    const order = await this.deliveryOrderService.findOne({ _id: cancelDeliveryOrderDto.orderId });

    if (!order) {
      throw new BadRequestException(this.wrapFail('Доставка не найдена'));
    }

    if (order.status > DeliveryStatus.IN_PROCESSING) {
      throw new BadRequestException(this.wrapFail('Доставка нельзя отменить'));
    }

    await this.deliveryOrderService.updateOne(
      { _id: cancelDeliveryOrderDto.orderId },
      { $set: { status: DeliveryStatus.CANCELED } }
    );

    return this.wrapSuccess();
  }
}
