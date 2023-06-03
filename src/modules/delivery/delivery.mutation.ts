import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DescribeContext } from '@/utils/decorators';
import { BaseResolver } from '@/utils/services';

import { DeliverResponse } from './delivery.model';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryOrderDto } from './dto';
import { Delivery, DeliveryStatus } from './entities';

@Resolver('📦 delivery mutation')
@DescribeContext('DeliveryMutation')
@Resolver(() => Delivery)
export class DeliveryMutation extends BaseResolver {
  constructor(private readonly deliveryService: DeliveryService) {
    super();
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
}
