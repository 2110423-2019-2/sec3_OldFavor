import { db } from '../db';
import { Notification, User } from '../model';
import * as nodemailer from 'nodemailer';

export async function getAll(query) {
  const res = await db.notifications.find(query).sort({created:-1}).toArray();
  await db.notifications.updateMany(query,{$set:{read:true}});
  return res;
}
export function getCount(query) {
  return db.notifications.find(query).count();
}

export async function create(notification: Notification) {
  const userID = notification.to;
  const user = await db.users.findOne({_id: userID});
  const email = user.email;
  await db.notifications.insertOne(notification);
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'sheetplus.income.notifier@gmail.com',
      pass: 'npoeqegwjzeyfksz'
    }
  });
  return await transporter.sendMail({
    from: '"RENTSEE" <sheetplus.income.notifier@gmail.com>',
    to: email,
    subject: "RENTSEE: Notification",
    text: notification.message,
    html: notification.message,
  });
}