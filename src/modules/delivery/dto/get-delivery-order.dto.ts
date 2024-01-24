import { ArgsType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetDeliveryOrderDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ description: 'Идентификатор доставки' })
  orderId: string;
}
