import { Field, ArgsType, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

@InputType('CalculateDeliveryPointDto')
export class CalculateDeliveryPointDto {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  @ApiProperty({ example: 'latitude', description: 'Широта' })
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  @ApiProperty({ example: 'longitude', description: 'Долгота' })
  longitude: number;
}

@InputType('CalculateDeliveryPackageDto')
export class CalculateDeliveryPackageDto {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  @ApiProperty({ example: 'length', description: 'Длина посылки' })
  length: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  @ApiProperty({ example: 'width', description: 'Ширина посылки' })
  width: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  @ApiProperty({ example: 'weight', description: 'Длина посылки' })
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  @ApiProperty({ example: 'length', description: 'Высота посылки' })
  height: number;
}

@ArgsType()
export class CalculateDeliveryDto {
  @ValidateNested()
  @Field(() => CalculateDeliveryPackageDto)
  @ApiProperty({ description: 'Поссылка', type: CalculateDeliveryPackageDto })
  package: CalculateDeliveryPackageDto;

  @ValidateNested()
  @Field(() => CalculateDeliveryPointDto)
  @ApiProperty({ description: 'Город отправки', type: CalculateDeliveryPointDto })
  senderPoint: CalculateDeliveryPointDto;

  @ValidateNested()
  @Field(() => CalculateDeliveryPointDto)
  @ApiProperty({ description: 'Город получения', type: CalculateDeliveryPointDto })
  receiverPoint: CalculateDeliveryPointDto;
}
