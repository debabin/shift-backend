import { Injectable } from '@nestjs/common';
import type {
  Document,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline
} from 'mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BaseService<Doc extends Document, Entity> {
  constructor(private readonly model: Model<Doc>) {}

  create(body: Omit<Entity, '_id' | 'created'>) {
    return this.model.create(body);
  }

  total(
    filter: FilterQuery<Doc>,
    projection: string | Record<string, unknown> = {},
    options: QueryOptions = {}
  ) {
    const documents = this.model.find(filter, projection, options);
    return documents.count();
  }

  findOne(filter: FilterQuery<Doc>) {
    return this.model.findOne(filter);
  }

  insertMany(array: any, cb?: any) {
    return this.model.insertMany(array, cb);
  }

  findById(id: string) {
    return this.model.findById(id);
  }

  find(
    filter: FilterQuery<Doc>,
    projection: string | Record<string, unknown> = {},
    options: QueryOptions = {}
  ) {
    return this.model.find(filter, projection, options);
  }

  updateOne(
    filter: FilterQuery<Doc>,
    update: UpdateQuery<Doc> | UpdateWithAggregationPipeline,
    options: QueryOptions<Doc> = {}
  ) {
    return this.model.updateOne(filter, update, options);
  }

  updateMany(
    filter: FilterQuery<Doc>,
    update: UpdateQuery<Doc> | UpdateWithAggregationPipeline,
    options: QueryOptions<Doc> = {}
  ) {
    return this.model.updateMany(filter, update, options);
  }

  findOneAndUpdate(
    filter: FilterQuery<Doc>,
    update: UpdateQuery<Doc>,
    options: QueryOptions<Doc> = {}
  ) {
    return this.model.findOneAndUpdate(filter, update, { new: true, ...options });
  }

  delete(filter: FilterQuery<Doc>) {
    return this.model.deleteMany(filter);
  }

  async findAndDelete(filter: FilterQuery<Doc>) {
    const documents = await this.model.find(filter);
    const deletedInfo = await this.model.deleteMany(filter);
    return { ...deletedInfo, documents };
  }
}
