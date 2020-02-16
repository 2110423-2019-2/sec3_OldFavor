import { Context } from 'koa';
import { ObjectID } from 'mongodb';

import * as cars from '../cars/service';
import { Rent } from '../model';
import * as service from './service';

export async function find(ctx: Context) {
  ctx.body = await service.find({});
}
export async function _clear(ctx: Context) {
  ctx.body = await service._clear();
}
export async function create(ctx: Context) {
  const rent: Rent = ctx.request.body;
  rent.carId = new ObjectID(ctx.params.id);
  rent.renterId = new ObjectID(ctx.state.user._id);
  rent.lessorId = (await cars.findById(ctx.params.id)).ownerId;
  ctx.body = service.create(rent);
}
export async function removeById(ctx: Context) {
  const rentId = new ObjectID(ctx.params.id);
  const userId = new ObjectID(ctx.state.user._id);
  ctx.body = await service.removeOne({ _id: rentId, renterId: userId });
}
