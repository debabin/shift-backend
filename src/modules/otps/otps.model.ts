import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/utils/services';

import { Otp } from './entities';

@ObjectType()
export class OtpResponse extends BaseResponse {
  @Field(() => Number)
  @ApiProperty({ example: 120000, description: 'Время запроса повторного отп кода в мс' })
  retryDelay: number;
}

@ObjectType()
export class OtpsResponse extends BaseResponse {
  @Field(() => [Otp])
  otps: Otp[];
}
