import { db } from '../../db'
import { Rent, Car, User } from '../../model'
import { Context } from 'koa'

export class Admin {

    approveLicense = async(ctx: Context) => {
	  ctx.body = await db.users.updateMany({},{$set:{licenseVerified:true}});
	}
	
	approveCar = async(ctx: Context) => {
	  ctx.body =  await db.cars.updateMany({},{$set:{verified:true}});
	}
		
}