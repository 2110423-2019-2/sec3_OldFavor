import { db } from '../db';
import { Rent } from '../model';

export async function find(query = {}) {
  return db.rents.find(query).toArray();
}
export async function create(rent: Rent) {
  return db.rents.insertOne(rent);
}
export async function removeOne(query) {
  return db.rents.deleteOne(query);
}

export async function _clear(query = {}) {
  return db.rents.remove(query);
}
