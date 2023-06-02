import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class PubSubService {
  public pubSub: PubSub;

  constructor() {
    this.pubSub = new PubSub();
  }
}
