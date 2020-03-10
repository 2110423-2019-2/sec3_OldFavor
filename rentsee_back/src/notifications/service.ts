import { db } from '../db';
import { Notification } from '../model';

export async function getAll(query) {
  const res = await db.notifications.find(query).sort({created:-1}).toArray();
  await db.notifications.updateMany(query,{$set:{read:true}});
  return res;
}
export function getCount(query) {
  return db.notifications.find(query).count();
}

export function create(notification: Notification) {
  return db.notifications.insertOne(notification);
}