import * as _ from 'lodash'
import { Context } from 'koa';
import { Credit, pay_rent } from './service';

export async function creditcard_pay(ctx: Context) {
  const rentId: string = ctx.params.id;
  const credit: Credit = ctx.request.body;
  ctx.assert(rentId,                   "rent id is required")
  ctx.assert(_.isPlainObject(credit),  "request body is required")
  ctx.assert(credit.creaditCardNumber, "credit number is required")
  ctx.assert(credit.ccv,               "credit ccv is required")
  ctx.assert(credit.expireMonth,       "credit expire month is required")
  ctx.assert(credit.expireYear,        "credit expire year body is required")
  ctx,body = await pay_rent(rentId, credit)
}