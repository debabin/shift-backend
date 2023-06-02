import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver } from '@/utils/services';

import { PointsResponse, PackageTypesResponse } from './delivery.model';

@ApiTags('📦 delivery')
@Controller('/delivery')
export class DeliveryController extends BaseResolver {
  @Get('/points')
  @ApiOperation({ summary: 'получить пункты выдачи' })
  @ApiResponse({
    status: 200,
    description: 'points',
    type: PointsResponse
  })
  async points(): Promise<PointsResponse> {
    return this.wrapSuccess({ points: [] });
  }

  @Get('/package/types')
  @ApiOperation({ summary: 'получить типы посылки' })
  @ApiResponse({
    status: 200,
    description: 'package types',
    type: PackageTypesResponse
  })
  async packageTypes(): Promise<PointsResponse> {
    return this.wrapSuccess({ points: [] });
  }
}
