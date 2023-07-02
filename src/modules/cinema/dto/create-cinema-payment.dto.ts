import { Field, ArgsType, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

@InputType('CreatePaymentTicketsDto')
export class CreatePaymentTicketsDto {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  @ApiProperty({ example: 1, description: 'Ряд' })
  row: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  @ApiProperty({ example: 1, description: 'Место' })
  column: number;
}

@InputType('CreatePaymentDebitCardDto')
export class CreatePaymentDebitCardDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '1111 1111', description: 'Номер карты' })
  pan: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '11/11', description: 'Срок действие карты' })
  expireDate: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '111', description: 'Код карты' })
  cvv: string;
}

@InputType('CreatePaymentPersonDto')
export class CreatePaymentPersonDto {
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

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '89990009999', description: 'Телефон' })
  phone: string;
}

@InputType('CreatePaymentSeanceDto')
export class CreatePaymentSeanceDto {
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '29.06.23', description: 'Дата сеанса' })
  date: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '10:00', description: 'Время сеанса' })
  time: string;
}

@ArgsType()
export class CreateCinemaPaymentDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ description: 'Идентификатор фильма' })
  filmId: string;

  @ValidateNested()
  @Field(() => CreatePaymentPersonDto)
  @ApiProperty({ description: 'Покупатель', type: CreatePaymentPersonDto })
  person: CreatePaymentPersonDto;

  @ValidateNested()
  @Field(() => CreatePaymentDebitCardDto)
  @ApiProperty({ description: 'Банковская карта', type: CreatePaymentDebitCardDto })
  debitCard: CreatePaymentDebitCardDto;

  @ValidateNested()
  @Field(() => CreatePaymentSeanceDto)
  @ApiProperty({ description: 'Сеанс фильма', type: CreatePaymentSeanceDto })
  seance: CreatePaymentSeanceDto;

  @IsArray()
  @ValidateNested()
  @Field(() => [CreatePaymentTicketsDto])
  @ApiProperty({ description: 'Билеты', type: [CreatePaymentTicketsDto] })
  tickets: CreatePaymentTicketsDto[];
}
