import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('AddressInput')
@ObjectType()
export class Address {
  @Field(() => String)
  @ApiProperty({ example: 'street', description: 'Улица' })
  street: string;

  @Field(() => String)
  @ApiProperty({ example: 'house', description: 'Номер дома' })
  house: string;

  @Field(() => String)
  @ApiProperty({ example: 'appartament', description: 'Номер квартиры' })
  appartament: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'comment', description: 'Комментарий' })
  comment?: string;
}
