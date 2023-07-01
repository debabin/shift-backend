import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('DeliveryPackageTypeInput')
@ObjectType()
export class DeliveryPackageType {
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Индентификатор типа посылки' })
  id: string;

  @Field(() => String)
  @ApiProperty({ example: 'name', description: 'Название типа посылки' })
  name: string;

  @Field(() => Number)
  @ApiProperty({ example: 'length', description: 'Длина посылки' })
  length: number;

  @Field(() => Number)
  @ApiProperty({ example: 'width', description: 'Ширина посылки' })
  width: number;

  @Field(() => Number)
  @ApiProperty({ example: 'weight', description: 'Длина посылки' })
  weight: number;

  @Field(() => Number)
  @ApiProperty({ example: 'length', description: 'Высота посылки' })
  height: number;
}
