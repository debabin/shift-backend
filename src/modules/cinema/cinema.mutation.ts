import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { BaseResolver, BaseResponse } from '@/utils/services';

import { PaymentResponse } from './cinema.model';
import { CinemaService } from './cinema.service';
import { CancelCinemaOrderDto, CreateCinemaPaymentDto } from './dto';
import { Ticket, TicketStatus } from './entities';
import { CinemaOrderService } from './modules';

@Resolver('📦 cinema mutation')
@DescribeContext('CinemaMutation')
@Resolver(() => Ticket)
export class CinemaMutation extends BaseResolver {
  constructor(
    private readonly cinemaService: CinemaService,
    private readonly cinemaOrderService: CinemaOrderService
  ) {
    super();
  }

  @GqlAuthorizedOnly()
  @Mutation(() => BaseResponse)
  async cancelCinemaOrder(
    @Args() cancelCinemaOrderDto: CancelCinemaOrderDto
  ): Promise<BaseResponse> {
    const order = await this.cinemaOrderService.findOne({ _id: cancelCinemaOrderDto.orderId });

    if (!order) {
      throw new BadRequestException(this.wrapFail('Заказ не найден'));
    }

    const [ticket] = order.tickets;
    // TODO проверка по времени
    // if (order.status !== TicketStatus.PAYED || false) {
    //   throw new BadRequestException(this.wrapFail('Заказ нельзя отменить'));
    // }

    // TODO
    await this.cinemaService.updateOne(
      { _id: cancelCinemaOrderDto.orderId },
      { $set: { status: TicketStatus.CANCELED } }
    );

    return this.wrapSuccess();
  }

  @Mutation(() => PaymentResponse)
  async createCinemaPayment(
    @Args() createCinemaPaymentDto: CreateCinemaPaymentDto
  ): Promise<PaymentResponse> {
    const formatedTickets = createCinemaPaymentDto.tickets.map((ticket) => ({
      filmId: createCinemaPaymentDto.filmId,
      seance: createCinemaPaymentDto.seance,
      status: TicketStatus.PAYED,
      phone: createCinemaPaymentDto.person.phone,
      row: ticket.row,
      column: ticket.column
    }));

    const existedTickets = [];
    await Promise.all(
      formatedTickets.map(async (ticket) => {
        const existedTicket = await this.cinemaService.findOne({
          'seance.date': ticket.seance.date,
          'seance.time': ticket.seance.time,
          row: ticket.row,
          column: ticket.column
        });

        if (existedTicket) {
          existedTickets.push(ticket);
        }
      })
    );

    if (existedTickets.length) {
      throw new BadRequestException(
        this.wrapFail(
          `Данные билеты уже куплены: ${existedTickets
            .map(
              (ticket, index) =>
                `${index + 1}. ${ticket.seance.date} ${ticket.seance.time} ${ticket.row} ${
                  ticket.column
                }`
            )
            .join(' ')}`,
          {
            tickets: existedTickets.map((ticket) => ({
              seance: ticket.seance,
              row: ticket.row,
              column: ticket.column
            }))
          }
        )
      );
    }

    const tickets = await this.cinemaService.insertMany(formatedTickets);

    const orderId = Math.floor(Math.random() * 10 ** 6);
    const order = await this.cinemaOrderService.create({
      orderId,
      tickets,
      phone: createCinemaPaymentDto.person.phone
    });
    return this.wrapSuccess({ order });
  }
}
