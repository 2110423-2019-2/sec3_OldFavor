import { Context } from 'koa'
import { ObjectID } from 'mongodb'

import * as cars from '../cars/service'
import * as notifications from '../notifications/service'
import { Rent } from '../model'
import * as service from './service'

export async function find(ctx: Context) {
  ctx.body = await service.find({})
}
export async function findById(ctx: Context) {
  ctx.body = (await service.findById(ctx.params.id))[0]
}
export async function search(ctx: Context) {
  const query = ctx.query.q
  const dateBegin = new Date(ctx.query.pickUpDateTime)
  const dateEnd = new Date(ctx.query.returnDateTime)
  let sorter = {}
  sorter[ctx.query.sort] = parseInt(ctx.query.sortWay)
  ctx.body = await service.search(query, sorter, dateBegin, dateEnd)
}
export async function findAsLessor(ctx: Context) {
  ctx.body = await service.find({ lessorId: new ObjectID(ctx.state.user._id) })
}
export async function findAsLessee(ctx: Context) {
  ctx.body = await service.find({ renterId: new ObjectID(ctx.state.user._id) })
}
export async function _clear(ctx: Context) {
  ctx.body = await service._clear()
}
export async function confirm(ctx: Context) {
  const rentId = new ObjectID(ctx.params.id)
  const rent: Rent = await service.findOne({ _id: rentId })
  if (rent.status != 0) ctx.body = null
  else {
    let totalPrice = Math.round(
      ((Date.parse(ctx.request.body.returnDateTime) -
        Date.parse(ctx.request.body.pickUpDateTime)) *
        rent.pricePerDay) /
        (3600 * 24 * 1000)
    )
    let renterId = new ObjectID(ctx.state.user._id)

   await notifications.create({
      to: rent.lessorId,
      message:
        'Someone rented your car, please check your history page',
      read: false,
      created: new Date(),
    })

    await notifications.create({
      to: renterId,
      message:
        'Your card has been charged ' + (totalPrice*0.4).toString() +' Baht',
      read: false,
      created: new Date(),
    })
    ctx.body = await service.patch(
      { _id: rentId },
      {
        pickUpDateTime: new Date(ctx.request.body.pickUpDateTime),
        returnDateTime: new Date(ctx.request.body.returnDateTime),
        status: 1,
        renterId,
        totalPrice,
        matched: new Date(),
      },
    )
  }
  ctx.assert(ctx.body, 400, 'Deal is off')
}
export async function lessorCancel(ctx: Context) {
  const rentId = new ObjectID(ctx.params.id)
  const rent: Rent = await service.findOne({ _id: rentId })
  await notifications.create({
    to: rent.renterId,
    message:
      'One of the deals has been canceled by the lessor, please check your history page for more detail',
    read: false,
    created: new Date(),
  })
  const lessorId = new ObjectID(ctx.state.user._id)
  ctx.body = await service.patch(
    { _id: rentId, lessorId: lessorId },
    {
      status: 2,
      cancelReason: ctx.request.body.cancelReason,
    },
  )
  ctx.assert(ctx.body, 401, 'Not Your Deal')
}
export async function lesseeCancel(ctx: Context) {
  const rentId = new ObjectID(ctx.params.id)
  const rent: Rent = await service.findOne({ _id: rentId })
  await notifications.create({
    to: rent.lessorId,
    message:
      'One of the deals has been canceled by the lessee, please check your history page for more detail',
    read: false,
    created: new Date(),
  })
  const lesseeId = new ObjectID(ctx.state.user._id)
  ctx.body = await service.patch(
    { _id: rentId, renterId: lesseeId },
    {
      status: 3,
      cancelReason: ctx.request.body.cancelReason,
    },
  )
  ctx.assert(ctx.body, 401, 'Not Your Deal')
}

export async function create(ctx: Context) {
  ctx.request.body.pricePerDay = parseInt(ctx.request.body.pricePerDay)
  ctx.request.body.pickUpDateTime = new Date(ctx.request.body.pickUpDateTime)
  ctx.request.body.returnDateTime = new Date(ctx.request.body.returnDateTime)
  const rent: Rent = ctx.request.body
  rent.carId = new ObjectID(ctx.params.id)
  rent.lessorId = new ObjectID(ctx.state.user._id)
  rent.renterId = null
  rent.status = 0
  rent.created = new Date()
  rent.matched = null
  ctx.body = await service.create(rent)
}
export async function removeById(ctx: Context) {
  const rentId = new ObjectID(ctx.params.id)
  const userId = new ObjectID(ctx.state.user._id)
  ctx.body = await service.removeOne({ _id: rentId, renterId: userId })
}
