import type { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

const JWT_GUARD = 'jwt';

@Injectable()
export class GqlAuthGuard extends AuthGuard(JWT_GUARD) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
