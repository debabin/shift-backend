import { ArgsType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ArgsType()
export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '89990009999', description: 'Номер телефона' })
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  @ApiProperty({ example: 345231, description: 'Отп код' })
  code: number;
}
