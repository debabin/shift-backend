import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import type { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@InputType('OtpInput')
@ObjectType()
@Schema({
  collection: 'otps',
  versionKey: false,
  minimize: false,
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
export class Otp {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @ApiProperty({ example: new Date(), description: 'Дата создание отп кода' })
  created: string;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ example: '89990009999', description: 'Номер телефона' })
  phone: string;

  @Field(() => Number)
  @Prop({ required: true })
  @ApiProperty({ example: 650231, description: 'Отп код' })
  code: number;

  @Field(() => Number)
  @Prop({ required: true })
  @ApiProperty({ example: 120000, description: 'Время запроса повторного отп кода' })
  retryDelay: number;
}

export type OtpDocument = Otp & Document;
export const OtpSchema = SchemaFactory.createForClass(Otp);
