import type { NestInterceptor } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';

export const ResolverCommon = (...interceptors: (NestInterceptor | any)[]) =>
  UseInterceptors(...interceptors);
