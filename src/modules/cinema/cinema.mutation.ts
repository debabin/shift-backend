import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { BaseResolver, BaseResponse } from '@/utils/services';

import { CinemaService } from './cinema.service';
import { CancelTicketOrderDto } from './dto';
import { Ticket, TicketStatus } from './entities';

@Resolver('📦 cinema mutation')
@DescribeContext('CinemaMutation')
@Resolver(() => Ticket)
export class DeliveryMutation extends BaseResolver {
  constructor(private readonly cinemaService: CinemaService) {
    super();
  }

  @GqlAuthorizedOnly()
  @Mutation(() => BaseResponse)
  async cancelDeliveryOrder(
    @Args() cancelTicketOrderDto: CancelTicketOrderDto
  ): Promise<BaseResponse> {
    const ticket = await this.cinemaService.findOne({ _id: cancelTicketOrderDto.ticketId });

    if (!ticket) {
      throw new BadRequestException(this.wrapFail('Билет не найден'));
    }

    if (ticket.status !== TicketStatus.PAYED || false) {
      throw new BadRequestException(this.wrapFail('Билет нельзя отменить'));
    }

    await this.cinemaService.updateOne(
      { _id: cancelTicketOrderDto.ticketId },
      { $set: { status: TicketStatus.CANCELED } }
    );

    return this.wrapSuccess();
  }
}
