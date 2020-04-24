import { db } from '../../db'
import { Notification } from '../../model'
import { ObjectID } from 'mongodb'
import { Context } from 'koa'
import { Email } from "./EmailClass";

export class Notifications {
	
	allNotification = async(notification: Notification) => {
	  const userID = notification.to;
	  const user = await db.users.findOne({_id: userID});
	  const email = user.email;
	  
	  const mailService = new Email();
	  const mailStuff = {
		from: '"RENTSEE" <sheetplus.income.notifier@gmail.com>',
		to: email,
		subject: "RENTSEE: Notification",
		text: notification.message,
		html: notification.message,
	  };
	  mailService.sendMail(mailStuff);
	  
	  return await db.notifications.insertOne(notification);
	}
	
	webNotification = async(notification: Notification) => {
	  return await db.notifications.insertOne(notification);
	}
		
}