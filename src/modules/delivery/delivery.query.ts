import { Query, Resolver } from '@nestjs/graphql';

import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { BaseResolver } from '@/utils/services';

import { PointsResponse, PackageTypesResponse } from './delivery.model';

@Resolver('📦 delivery query')
@GqlAuthorizedOnly()
@DescribeContext('DeliveryQuery')
@Resolver()
export class DeliveryQuery extends BaseResolver {
  @Query(() => PointsResponse)
  async getDeliveryPoints() {
    return this.wrapSuccess({ points: [] });
  }

  @Query(() => PackageTypesResponse)
  async getDeliveryPackageTypes() {
    return this.wrapSuccess({ packages: [] });
  }
}
