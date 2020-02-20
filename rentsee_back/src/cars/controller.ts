import { Context } from 'koa';
import { ObjectID } from 'mongodb';

import { Car } from '../model';
import * as service from './service';

export async function find(ctx: Context) {
  ctx.body = await service.find({});
}
export async function findById(ctx: Context) {
  ctx.body = await service.findById(ctx.params.id);
}
export async function search(ctx: Context) {
  const query = ctx.query.q;
  ctx.body = await service.search(query);
}

export async function create(ctx: Context) {
  const car: Car = ctx.request.body;
  car.ownerId = new ObjectID(ctx.state.user._id);
  ctx.body = await service.create(ctx.request.body);
}
export async function patchById(ctx: Context) {
  const carId = ctx.params.id;
  const userId = ctx.state.user._id;
  ctx.body = service.patch(
    { _id: new ObjectID(carId), ownerId: new ObjectID(userId) },
    ctx.request.body
  );
  ctx.assert(ctx.body, 401, 'you not own this car');
}

export async function removeById(ctx: Context) {
  const carId = ctx.params.id;
  const userId = ctx.state.user._id;
  ctx.body = service.remove({ _id: new ObjectID(carId), ownerId: new ObjectID(userId) });
  ctx.assert(ctx.body, 401, 'you not own this car');
}
