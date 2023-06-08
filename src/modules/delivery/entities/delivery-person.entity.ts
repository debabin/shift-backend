import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('DeliveryPersonInput')
@ObjectType()
export class DeliveryPerson {
  @Field(() => String)
  @ApiProperty({ example: 'firstname', description: 'Имя' })
  firstname: string;

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
