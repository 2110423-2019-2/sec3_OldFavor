import * as _ from 'lodash'
import { Context } from 'koa';
import { Credit, pay_rent, cancel_rent } from './service';

export async function creditcard_pay(ctx: Context) {
  const rentId: string = ctx.params.id;
  const credit: Credit = ctx.request.body;
  ctx.assert(rentId,                   400, "rent id is required")
  ctx.assert(_.isPlainObject(credit),  400, "request body is required")
  ctx.assert(credit.creaditCardNumber, 400, "credit number is required")
  ctx.assert(credit.ccv,               400, "credit ccv is required")
  ctx.assert(credit.expireMonth,       400, "credit expire month is required")
  ctx.assert(credit.expireYear,        400, "credit expire year body is required")
  ctx.body = await pay_rent(rentId, credit)
}

export async function creditcard_cancel(ctx: Context) {
  const userId = ctx.state.user._id
  const rentId = ctx.params.id
  ctx.body = await cancel_rent(rentId, userId)
}