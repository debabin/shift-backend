import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('CountryInput')
@ObjectType()
export class Country {
  @ApiProperty()
  @Field(() => String)
  name: string;

  @ApiProperty()
  @Field(() => String)
  code: string;

  @ApiProperty()
  @Field(() => String)
  code2: string;

  @ApiProperty()
  @Field(() => Number)
  id: number;
}
