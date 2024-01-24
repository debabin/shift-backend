import type { CanActivate } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';

import { ApiAuthGuard } from './api-auth.guard';
import { GqlAuthGuard } from './gql-auth.guard';

export const GqlAuthorizedOnly = (...otherGuards: (any | CanActivate)[]) =>
  UseGuards(GqlAuthGuard, ...otherGuards);

export const ApiAuthorizedOnly = (...otherGuards: (any | CanActivate)[]) =>
  UseGuards(ApiAuthGuard, ...otherGuards);
