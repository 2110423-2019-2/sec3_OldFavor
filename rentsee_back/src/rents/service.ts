import { db } from '../db'
import { Rent } from '../model'
import { ObjectID } from 'mongodb'

export async function find(query = {}) {
  return db.rents
    .find(query)
    .sort({ created: -1 })
    .toArray()
}
export function findOne(query) {
  return db.rents.findOne(query)
}
export function findById(id: string) {
  return db.rents
    .aggregate([
      { $match: { _id: new ObjectID(id) } },
      {
        $lookup: {
          from: 'cars',
          localField: 'carId',
          foreignField: '_id',
          as: 'car',
        },
      },
    ])
    .toArray()
}
export function search(query: string, sorter, dateBegin, dateEnd) {
  return db.rents
    .aggregate([
      {
        $lookup: {
          from: 'cars',
          localField: 'carId',
          foreignField: '_id',
          as: 'car',
        },
      },
      { $unwind: '$car' },
      {
        $match: {
          $and: [
            { status: 0 },
            {
              $or: [
                {
                  'car.licensePlate': { $regex: `.*${query}.*`, $options: 'i' },
                },
                { 'car.carModel': { $regex: `.*${query}.*`, $options: 'i' } },
                { 'car.carType': { $regex: `.*${query}.*`, $options: 'i' } },
                {
                  'car.carDescription': {
                    $regex: `.*${query}.*`,
                    $options: 'i',
                  },
                },
                { pickUpLocation: { $regex: `.*${query}.*`, $options: 'i' } },
                { returnLocation: { $regex: `.*${query}.*`, $options: 'i' } },
              ],
            },
            { pickUpDateTime: { $lte: dateBegin } },
            { returnDateTime: { $gte: dateEnd } },
          ],
        },
      },
      { $sort: sorter },
    ])
    .toArray()
}
export async function create(rent: Rent) {
  return db.rents.insertOne(rent)
}
export async function removeOne(query) {
  return db.rents.deleteOne(query)
}
export function patch(query: any, rent: any) {
  return db.rents.findOneAndUpdate(
    query,
    { $set: rent },
    { upsert: false, returnOriginal: false },
  )
}

export async function _clear(query = {}) {
  return db.rents.remove(query)
}
