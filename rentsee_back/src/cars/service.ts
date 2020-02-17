import { ObjectID } from 'mongodb';

import { db } from '../db';
import { Car } from '../model';
import { DISTRICTS } from '../utils/constant';

export function find(query: any) {
  return db.cars.find(query).toArray();
}
export function findById(id: string) {
  return db.cars.findOne({ _id: new ObjectID(id) });
}
export function search(query: string) {
  return db.cars
    .find({
      $or: [
        { licensePlate: { $regex: `.*${query}.*`, $options: 'i' } },
        { carModel: { $regex: `.*${query}.*`, $options: 'i' } },
        { carType: { $regex: `.*${query}.*`, $options: 'i' } },
        { carDescription: { $regex: `.*${query}.*`, $options: 'i' } }
      ]
    })
    .toArray();
}

export function create(car: Car) {
  return db.cars.insertOne(car);
}
export function patch(query: any, car: Car) {
  return db.cars.findOneAndUpdate(query, { $set: car }, { upsert: false, returnOriginal: false });
}
export function patchById(id: string, car: Car) {
  return patch({ _id: new ObjectID(id) }, car);
}
export function remove(query: any) {
  return db.cars.deleteOne(query);
}
export function removeById(id: string) {
  return remove({ id: new ObjectID(id) });
}
