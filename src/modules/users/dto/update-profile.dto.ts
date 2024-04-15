import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

@InputType()
class UpdateProfileProfileDto {
  @IsString()
  @IsOptional()
  @Field(() => String)
  @ApiProperty({ example: 'firstname', description: 'Имя', nullable: true })
  firstname?: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  @ApiProperty({ example: 'middlename', description: 'Отчество', nullable: true })
  middlename?: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  @ApiProperty({ example: 'lastname', description: 'Фамилия', nullable: true })
  lastname?: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  @ApiProperty({ example: 'email@gmail.com', description: 'Почта', nullable: true })
  email?: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  @ApiProperty({ example: 'city', description: 'Город', nullable: true })
  city?: string;
}

@ArgsType()
export class UpdateProfileDto {
  @IsObject()
  @IsNotEmpty()
  @Field(() => UpdateProfileProfileDto)
  @ApiProperty({ description: 'Данные пользователя', type: UpdateProfileProfileDto })
  profile: UpdateProfileProfileDto;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '89990009999', description: 'Номер телефона' })
  phone: string;
}
