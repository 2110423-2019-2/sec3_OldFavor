import { Context } from 'koa';
import { ObjectID } from 'mongodb';

import { Notification } from '../model';
import * as service from './service';

export async function getAll(ctx: Context) {
  ctx.body = await service.getAll({to: new ObjectID(ctx.state.user._id)});
}
export async function getCount(ctx: Context) {
  ctx.body = await service.getCount({to: new ObjectID(ctx.state.user._id), read: false});
}
