import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema, Document } from 'mongoose';

import { Ticket } from '../../entities';

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

  @Field(() => Number)
  @Prop({ required: true })
  @ApiProperty({ description: 'Номер заказа' })
  orderId: Number;

  @Field(() => [Ticket])
  @Prop({ required: true })
  @ApiProperty({ description: 'Город отправки', type: [Ticket] })
  tickets: Ticket[];

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ example: '89990009999', description: 'Телефон' })
  phone: string;
}

export type CinemaOrderDocument = CinemaOrder & Document;
export const CinemaOrderSchema = SchemaFactory.createForClass(CinemaOrder);
