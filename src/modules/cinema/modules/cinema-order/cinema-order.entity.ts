import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import type { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

import { Ticket } from '../../entities';

export enum CinemaOrderStatus {
  PAYED = 'PAYED',
  CANCELED = 'CANCELED'
}

registerEnumType(CinemaOrderStatus, {
  name: 'CinemaOrderStatus'
});

@InputType('CinemaOrderInput')
@ObjectType()
@Schema({
  collection: 'cinema/order',
  versionKey: false,
  minimize: false,
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
export class CinemaOrder {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ description: 'Название фильма' })
  filmName: string;

  @Field(() => Number)
  @Prop({ required: true })
  @ApiProperty({ description: 'Номер заказа' })
  orderNumber: number;

  @Field(() => [Ticket])
  @Prop({ required: true })
  @ApiProperty({ description: 'Билеты', type: [Ticket] })
  tickets: Ticket[];

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ example: '89990009999', description: 'Телефон' })
  phone: string;

  @Field(() => CinemaOrderStatus)
  @Prop({ required: true, default: CinemaOrderStatus.PAYED })
  @ApiProperty({ description: 'Статус билета', enum: CinemaOrderStatus })
  status: CinemaOrderStatus;
}

export type CinemaOrderDocument = CinemaOrder & Document;
export const CinemaOrderSchema = SchemaFactory.createForClass(CinemaOrder);
