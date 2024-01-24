import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import type { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@InputType('UserInput')
@ObjectType()
@Schema({
  collection: 'users',
  versionKey: false,
  minimize: false
})
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ example: '89990009999', description: 'Номер телефона' })
  phone: string;

  @Field(() => String)
  @Prop()
  @ApiProperty({ example: 'firstname', description: 'Имя', required: false })
  firstname?: string;

  @Field(() => String)
  @Prop()
  @ApiProperty({ example: 'middlename', description: 'Отчество', required: false })
  middlename?: string;

  @Field(() => String)
  @Prop()
  @ApiProperty({ example: 'lastname', description: 'Фамилия', required: false })
  lastname?: string;

  @Field(() => String)
  @Prop()
  @ApiProperty({ example: 'email@gmail.com', description: 'Почта', required: false })
  email?: string;

  @Field(() => String)
  @Prop()
  @ApiProperty({ example: 'city', description: 'Город', required: false })
  city?: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
