import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema, Document } from 'mongoose';

export enum TicketStatus {
  PAYED = 'PAYED',
  CANCELED = 'CANCELED'
}

registerEnumType(TicketStatus, {
  name: 'TicketStatus'
});

@InputType('FilmTicketSeanceInput')
@ObjectType()
export class FilmTicketSeance {
  @Field(() => String)
  @ApiProperty({ example: '19.06.23', description: 'Дата сеанса' })
  date: string;

  @Field(() => String)
  @ApiProperty({ example: '21:57', description: 'Время сеанса' })
  time: string;
}

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

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ description: 'Идентификатор фильма' })
  filmId: string;

  @Field(() => Number)
  @ApiProperty({ example: 1, description: 'Ряд' })
  row: number;

  @Field(() => Number)
  @ApiProperty({ example: 1, description: 'Место' })
  column: number;

  @Field(() => FilmTicketSeance)
  @ApiProperty({ description: 'Сеанс фильма', type: FilmTicketSeance })
  seance: FilmTicketSeance;

  @Field(() => TicketStatus)
  @Prop({ required: true, default: TicketStatus.PAYED })
  @ApiProperty({ description: 'Статус билета', enum: TicketStatus })
  status: TicketStatus;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ example: '89990009999', description: 'Телефон' })
  phone: string;
}

export type TicketDocument = Ticket & Document;
export const TicketSchema = SchemaFactory.createForClass(Ticket);
