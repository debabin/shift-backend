import { Query, Resolver } from '@nestjs/graphql';

import { DescribeContext } from '@/utils/decorators';
import { BaseResolver } from '@/utils/services';

import { FilmsResponse } from './cinema.model';

@Resolver('🍿 cinema query')
@DescribeContext('CinemaQuery')
@Resolver()
export class CinemaQuery extends BaseResolver {
  @Query(() => FilmsResponse)
  async getFilms(): Promise<FilmsResponse> {
    const films = [];
    return this.wrapSuccess({ films });
  }
}
