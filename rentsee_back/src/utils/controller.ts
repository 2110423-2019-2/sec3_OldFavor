import { Context } from 'koa';
import { DISTRICTS } from './constant';
import { includes } from 'lodash';
//import * as service from './service';

export function districtsSearch(ctx: Context) {
  const query = ctx.query.q || '';
  //ctx.body = service.districtsSearch(query);
  return null;
}
