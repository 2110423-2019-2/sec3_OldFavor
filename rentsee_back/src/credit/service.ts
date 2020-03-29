import * as rent_service from '../rents/service'
import * as user_service from '../users/service'
import * as _ from 'lodash'
import { User } from '../model';

export interface Credit {
  creaditCardNumber: string;
  expireMonth: string;
  expireYear: string;
  ccv: string;
}

function verify_payment(credit: Credit) {
  //! This credit card will not save to user
  if (!/^\d{16}$/.test(credit.creaditCardNumber)) throw new TypeError("creaditCardNumber is wrong format")
  if (!/^\d{2}$/.test(credit.expireMonth)) throw new TypeError("expireMonth is wrong format")
  if (!/^\d{2}$/.test(credit.expireYear)) throw new TypeError("expireYear is wrong format")
  if (!/^\d{3}$/.test(credit.ccv)) throw new TypeError("ccv is wrong format")
  return true;
}

async function exec_payment(money: number, credit: Credit): Promise<{ok: number, timestamp: number, card: string}> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        ok: 1,
        timestamp: new Date().getTime(),
        card: credit.creaditCardNumber
      })
    }, 100);
  })
}

async function dispose_money_from(money: number, credit: Credit) {
  return exec_payment(-money, credit);
}
async function transfer_money_to(money: number, credit: string) {
  // @ts-ignore
  return exec_payment(money, {
    creaditCardNumber: credit
  });
}

export async function pay_rent(rentId: string, credit: Credit) {
  verify_payment(credit);
  const rents = await rent_service.findById(rentId)
  if (_.isEmpty(rents) || rents.length != 1) throw new Error("rentId not found")
  if (rents[0].credit_card) throw new Error("already pay")
  const pay = await dispose_money_from(rents[0].totalPrice, credit)
  if (!pay.ok) throw new Error("payment bank error")
  const write = await rent_service.updateById(rentId, {
    status: 4, // done
    credit_card: credit.creaditCardNumber,
    credit_date: new Date()
  }) // status 4=done
  if (!write.ok) throw new Error("update status error, but payment is done")
  return write.value
}

export async function cancel_rent(rentId: string, userId: string) {
  const rents = await rent_service.findById(rentId)
  const user = await user_service.findById(userId)
  if (_.isEmpty(rents) || rents.length != 1) throw new Error("rentId not found")
  const rent = rents[0]
  if (rent.status == 2) throw new Error(`rent status is already cancel by lessor`)
  if (rent.status == 3) throw new Error(`rent status is already cancel by lessee`)
  if (rent.status != 4) throw new Error(`can not cancel un paid`)
  if (!rent.credit_card || !rent.credit_date) throw new Error(`no previous payment information`)
  const diff = new Date().getTime() - new Date(rent.credit_date).getTime()
  const day = 24 * 60 * 60 * 1000
  // 2 = lessorcancel 3 = lesseecancel
  const status = {
    [String(rent.renterId)]: 2,
    [String(rent.lessorId)]: 3,
  }[userId]

  if (!status) throw new Error("you not involve to this payment")

  if (diff > 3 * day) {
    await transfer_money_to(rent.totalPrice * 1.0, rent.credit_card);
  } else if (diff > 1 * day) {
    await transfer_money_to(rent.totalPrice * 0.6, rent.credit_card);
  } else {
    await transfer_money_to(rent.totalPrice * 0.2, rent.credit_card);
  }
  return await rent_service.updateById(rentId, {
    status: status,
    credit_card: null,
    credit_date: null
  })
}