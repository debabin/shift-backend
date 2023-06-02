import { Field, ArgsType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SingUpDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '89990009999' })
  phone: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'firstname', required: false })
  firstname: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'middlename', required: false })
  middlename: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'lastname', required: false })
  lastname: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'email@gmail.com', required: false })
  email: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'city', required: false })
  city: string;
}
