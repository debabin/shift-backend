import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver } from '@/utils/services';

import { FilmsResponse } from './cinema.model';

@ApiTags('🍿 cinema')
@Controller('/cinema')
export class DeliveryController extends BaseResolver {
  @Get('/today')
  @ApiOperation({ summary: 'получить афишу фильмов' })
  @ApiResponse({
    status: 200,
    description: 'cinema today',
    type: FilmsResponse
  })
  getFilms(): FilmsResponse {
    const films = [];
    return this.wrapSuccess({ films });
  }
}
