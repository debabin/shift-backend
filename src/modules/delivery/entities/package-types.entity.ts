import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('PackageTypeInput')
@ObjectType()
export class PackageType {
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Индентификатор типа посылки' })
  id: string;

  @Field(() => String)
  @ApiProperty({ example: 'name', description: 'Название типа посылки' })
  name: string;
}
