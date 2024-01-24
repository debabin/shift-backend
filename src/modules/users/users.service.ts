import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import type { UserDocument } from './entities';
import { User } from './entities';

@Injectable()
export class UsersService extends BaseService<UserDocument, User> {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
    super(UserModel);
  }
}
