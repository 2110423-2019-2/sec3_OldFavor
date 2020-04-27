import { Context } from 'koa';
import * as _ from 'lodash';

import { User } from '../model';
import * as service from './service';

export async function register(ctx: Context) {
  const body: User = ctx.request.body;
  ctx.assert(body.username, 400, 'username is required');
  ctx.assert(body.password, 400, 'password is required');
  ctx.assert(!_.isEmpty(body), 400, 'body is required');
  body.emailVerified = false;
  body.licenseVerified = false;
  const ret = await service.register(body);
  service.sendEmail(body.email,ret.user._id);
  ctx.body = ret;
}

export async function login(ctx: Context) {
  const { username, password } = ctx.request.body;
  ctx.assert(username, 400, 'username is required');
  ctx.assert(password, 400, 'password is required');
  ctx.body = await service.login(username, password);
}

export async function patch(ctx: Context) {
  ctx.throw(401, 'edit another people profile is prohibit');
}
export async function patchMe(ctx: Context) {
  const user = ctx.request.body;
  const userData = await service.findById(ctx.state.user._id);
  if(user.email != userData.email) {
    user.emailVerified  = false;
    service.sendEmail(user.email,userData._id);
  }
  if(user.drivingLicense != userData.drivingLicense)
    user.licenseVerified  = false;
  ctx.assert(user, 400, 'body is required');
  ctx.body = await service.patch(ctx.state.user._id, user);
}

export async function find(ctx: Context) {
  ctx.body = await service.find(ctx.query || {});
}

export async function findById(ctx: Context) {
  ctx.body = await service.findById(ctx.params.id);
  ctx.assert(ctx.body, 404);
}

export async function verify(ctx: Context) {
  await service.verify(ctx.params.id);
  ctx.redirect('https://rentsee.poomrokc.services/profile');
}

export async function profile(ctx: Context) {
  ctx.body = await service.findById(ctx.state.user._id);
  ctx.assert(ctx.body, 404);
}
