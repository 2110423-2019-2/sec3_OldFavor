import * as rent_service from '../rents/service'
import * as _ from 'lodash'

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

async function pay_payment(money: number, credit: Credit): Promise<{ok: number, timestamp: number, card: string}> {
  if (verify_payment(credit)) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ok: 1,
          timestamp: new Date().getTime(),
          card: credit.creaditCardNumber
        })
      }, 100);
    })
  } else {
    throw new Error("payment error")
  }
}

export async function pay_rent(rentId: string, credit: Credit) {
  const rents = await rent_service.findById(rentId)
  if (_.isEmpty(rents) || rents.length != 1) throw new Error("rentId not found")
  const pay = await pay_payment(rents[0].totalPrice, credit)
  if (!pay.ok) throw new Error("payment bank error")
  const write = await rent_service.updateStatusById(rentId, 4) // status 4=done
  if (!write.ok) throw new Error("update status error, but payment is done")
  return write.value
}
