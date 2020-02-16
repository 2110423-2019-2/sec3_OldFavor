import { Context } from 'koa';

export function loggedIn(ctx: Context, next) {
  const auth = ctx.headers.authorization.trim();
  if (!auth || auth == 'Bearer null' || auth == 'Bearer') {
    ctx.throw(401, 'require login');
  }
  const err = ctx.state.jwtOriginalError;
  return err ? Promise.reject(err) : next();
}
