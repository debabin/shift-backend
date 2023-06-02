import { SetMetadata } from '@nestjs/common';

export const POKER_DESCRIBE_CONTEXT = Symbol('POKER_DESCRIBE_CONTEXT');

export const DescribeContext = (context: string) => SetMetadata(POKER_DESCRIBE_CONTEXT, context);
