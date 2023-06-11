import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema, Document } from 'mongoose';

import { Film } from './film.entity';

export enum TicketStatus {
  PAYED,
  CANCELED
}

registerEnumType(TicketStatus, {
  name: 'TicketStatus'
});

@InputType('TicketInput')
@ObjectType()
@Schema({
  collection: 'ticket',
  versionKey: false,
  minimize: false,
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
export class Ticket {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Film)
  @Prop({ required: true })
  @ApiProperty({ description: 'Фильм', type: Film })
  film: Film;

  @Field(() => TicketStatus)
  @Prop({ required: true, default: TicketStatus.PAYED })
  @ApiProperty({ description: 'Статус доставки', enum: TicketStatus })
  status: TicketStatus;
}

export type TicketDocument = Ticket & Document;
export const TicketSchema = SchemaFactory.createForClass(Ticket);
