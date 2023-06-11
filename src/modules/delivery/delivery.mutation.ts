import { randomUUID } from 'crypto';

import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { getDistance } from '@/utils/helpers';
import { BaseResolver, BaseResponse } from '@/utils/services';

import { DeliverResponse, CalculateDeliveryResponse } from './delivery.model';
import { DeliveryService } from './delivery.service';
import { CalculateDeliveryDto, CancelDeliveryOrderDto, CreateDeliveryOrderDto } from './dto';
import { Delivery, DeliveryStatus, DeliveryOption, DeliveryOptionType } from './entities';

@Resolver('📦 delivery mutation')
@DescribeContext('DeliveryMutation')
@Resolver(() => Delivery)
export class DeliveryMutation extends BaseResolver {
  constructor(private readonly deliveryService: DeliveryService) {
    super();
  }

  @GqlAuthorizedOnly()
  @Mutation(() => BaseResponse)
  async cancelDeliveryOrder(
    @Args() cancelDeliveryOrderDto: CancelDeliveryOrderDto
  ): Promise<BaseResponse> {
    const order = await this.deliveryService.findOne({ _id: cancelDeliveryOrderDto.orderId });

    if (!order) {
      throw new BadRequestException(this.wrapFail('Доставка не найдена'));
    }

    if (order.status > DeliveryStatus.IN_PROCESSING) {
      throw new BadRequestException(this.wrapFail('Доставка нельзя отменить'));
    }

    await this.deliveryService.updateOne(
      { _id: cancelDeliveryOrderDto.orderId },
      { $set: { status: DeliveryStatus.CANCELED } }
    );

    return this.wrapSuccess();
  }

  @Mutation(() => DeliverResponse)
  async createDeliveryOrder(
    @Args() createDeliveryOrderDto: CreateDeliveryOrderDto
  ): Promise<DeliverResponse> {
    const order = await this.deliveryService.create({
      ...createDeliveryOrderDto,
      status: DeliveryStatus.IN_PROCESSING
    });

    return this.wrapSuccess({ order });
  }

  @Mutation(() => CalculateDeliveryResponse)
  async calculateDelivery(
    @Args() calculateDeliveryDto: CalculateDeliveryDto
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
}
