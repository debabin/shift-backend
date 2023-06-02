import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class BaseResponse {
  @Field(() => Boolean)
  @ApiProperty({ description: 'Статус запроса' })
  success!: boolean;

  @Field(() => String, { nullable: true })
  @ApiProperty({ description: 'Причина ошибки', nullable: true, required: false })
  reason?: string;
}
