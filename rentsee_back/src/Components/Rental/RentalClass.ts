import { db } from '../../db'
import { Rent } from '../../model'
import { ObjectID } from 'mongodb'
import { Context } from 'koa'
import * as NotificationComponent from '../Notification/index';

export class Rental {

    editPolicy = async(ctx: Context) => {
	  const id = ctx.params.id;
	  const result = await db.rents
		.updateOne({_id: new ObjectID(id)},{$set:{policy:ctx.request.body.policy}});
	  const rent = await db.rents.findOne({_id:new ObjectID(id)});
	  const noti1 = {
		to: rent.renterId,
		message: 'Policy on one of the deals has been changed, please check the history page. If disagree, cancel the deal!',
		read: false,
		created: new Date(),
	  }
	  const noti2 = {
		to: rent.lessorId,
		message: 'Policy on one of the deals has been changed, please check the history page. If disagree, cancel the deal!',
		read: false,
		created: new Date(),
	  }
	  NotificationComponent.Notificationsinstance.allNotification(noti1);
	  NotificationComponent.Notificationsinstance.allNotification(noti2);
	  ctx.body = result;
	}
	
	receivedCar = async(ctx: Context) => {
	  const id = ctx.params.id;
	  const result = await db.rents
		.updateOne({_id: new ObjectID(id)},{$set:{status:4}});
	  const rent = await db.rents.findOne({_id:new ObjectID(id)});
	  const noti1 = {
		to: rent.renterId,
		message: 'One of the deal is marked as Car received, if this did not happen, contact support team immediately.',
		read: false,
		created: new Date(),
	  }
	  const noti2 = {
		to: rent.lessorId,
		message: 'One of the deal is marked as Car received, if this did not happen, contact support team immediately.',
		read: false,
		created: new Date(),
	  }
	  NotificationComponent.Notificationsinstance.allNotification(noti1);
	  NotificationComponent.Notificationsinstance.allNotification(noti2);
	  ctx.body = result;
	}
	
	returnCar = async(ctx: Context) => {
	  const id = ctx.params.id;
	  const result = await db.rents
		.updateOne({_id: new ObjectID(id)},{$set:{status:5}});
	  const rent = await db.rents.findOne({_id:new ObjectID(id)});
	  const noti1 = {
		to: rent.renterId,
		message: 'One of the deal is marked as Car returned, if this did not happen, contact support team immediately.',
		read: false,
		created: new Date(),
	  }
	  const noti2 = {
		to: rent.lessorId,
		message: 'One of the deal is marked as Car returned, if this did not happen, contact support team immediately.',
		read: false,
		created: new Date(),
	  }
	  NotificationComponent.Notificationsinstance.allNotification(noti1);
	  NotificationComponent.Notificationsinstance.allNotification(noti2);
	  ctx.body = result;
	}
		
}