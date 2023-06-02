import { UseInterceptors, NestInterceptor } from '@nestjs/common';

export const ResolverCommon = (...interceptors: (NestInterceptor | any)[]) =>
  UseInterceptors(...interceptors);
