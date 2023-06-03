import { Field, ArgsType, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { Payer } from '../entities';

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
  @ApiProperty({ example: 'city', description: 'Город' })
  city: string;

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
  @Field(() => String)
  @ApiProperty({ description: 'Адрес отправителя', type: CreateDeliveryOrderAddressDto })
  senderAddress: CreateDeliveryOrderAddressDto;

  @ValidateNested()
  @Field(() => CreateDeliveryOrderPersonDto)
  @ApiProperty({ description: 'Отправитель', type: CreateDeliveryOrderPersonDto })
  sender: CreateDeliveryOrderPersonDto;

  @ValidateNested()
  @Field(() => String)
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
}
