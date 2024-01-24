import { ArgsType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetScheduleDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ description: 'Идентификатор фильма' })
  filmId: string;
}
