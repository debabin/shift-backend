import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('PointInput')
@ObjectType()
export class Point {
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
}
