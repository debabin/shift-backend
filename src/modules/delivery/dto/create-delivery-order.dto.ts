import { Field, ArgsType, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

import { DeliveryOptionType, Payer } from '../entities';

@InputType('CreateDeliveryOrderDeliveryOptionDto')
export class CreateDeliveryOrderDeliveryOptionDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Индентификатор опции доставки' })
  id: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  @ApiProperty({ example: 10000, description: 'Цена доставки в копейках' })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  @ApiProperty({ example: 2, description: 'Количество дней доставки' })
  days: number;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: 'name', description: 'Название опции отправки' })
  name: string;

  @IsNotEmpty()
  @Field(() => DeliveryOptionType)
  @ApiProperty({ example: 'type', description: 'Тип доставки', enum: DeliveryOptionType })
  type: DeliveryOptionType;
}

@InputType('CreateDeliveryOrderPointDto')
export class CreateDeliveryOrderPointDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Индентификатор пункта' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: 'name', description: 'Название пункта' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  @ApiProperty({ example: 'latitude', description: 'Широта' })
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: 'longitude', description: 'Долгота' })
  longitude: number;
}

@InputType('CreateDeliveryOrderPersonDto')
export class CreateDeliveryOrderPersonDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: 'firstname', description: 'Имя' })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: 'lastname', description: 'Фамилия' })
  lastname: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'middlename', description: 'Отчество' })
  middlename?: string;

  @Field(() => String)
  @ApiProperty({ example: '89990009999', description: 'Телефон' })
  phone: string;
}

@InputType('CreateDeliveryOrderAddressDto')
export class CreateDeliveryOrderAddressDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: 'street', description: 'Улица' })
  street: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: 'house', description: 'Номер дома' })
  house: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: 'appartament', description: 'Номер квартиры' })
  appartament: string;

  @IsString()
  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'comment', description: 'Комментарий' })
  comment?: string;
}

@ArgsType()
export class CreateDeliveryOrderDto {
  @ValidateNested()
  @Field(() => CreateDeliveryOrderPointDto)
  @ApiProperty({ description: 'Город отправки', type: CreateDeliveryOrderPointDto })
  senderPoint: CreateDeliveryOrderPointDto;

  @ValidateNested()
  @Field(() => CreateDeliveryOrderAddressDto)
  @ApiProperty({ description: 'Адрес отправителя', type: CreateDeliveryOrderAddressDto })
  senderAddress: CreateDeliveryOrderAddressDto;

  @ValidateNested()
  @Field(() => CreateDeliveryOrderPersonDto)
  @ApiProperty({ description: 'Отправитель', type: CreateDeliveryOrderPersonDto })
  sender: CreateDeliveryOrderPersonDto;

  @ValidateNested()
  @Field(() => CreateDeliveryOrderPointDto)
  @ApiProperty({ description: 'Город получения', type: CreateDeliveryOrderPointDto })
  receiverPoint: CreateDeliveryOrderPointDto;

  @ValidateNested()
  @Field(() => CreateDeliveryOrderAddressDto)
  @ApiProperty({ description: 'Адрес получателя', type: CreateDeliveryOrderAddressDto })
  receiverAddress: CreateDeliveryOrderAddressDto;

  @ValidateNested()
  @Field(() => CreateDeliveryOrderPersonDto)
  @ApiProperty({ description: 'Получатель', type: CreateDeliveryOrderPersonDto })
  receiver: CreateDeliveryOrderPersonDto;

  @IsNotEmpty()
  @Field(() => Payer)
  @ApiProperty({ description: 'Кто будет оплачивать', enum: Payer })
  payer: Payer;

  @IsNotEmpty()
  @Field(() => CreateDeliveryOrderDeliveryOptionDto)
  @ApiProperty({ description: 'Опция доставки', type: CreateDeliveryOrderDeliveryOptionDto })
  option: CreateDeliveryOrderDeliveryOptionDto;
}
