import { db } from '../../db'
import { Rent } from '../../model'
import { ObjectID } from 'mongodb'
import { Context } from 'koa'

export class EReceipt {

    getReceipt = async(ctx: Context) => {
	  const id = ctx.params.id;
	  const resultArray = await db.rents
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
		  {
			$lookup: {
			  from: 'users',
			  localField: 'renterId',
			  foreignField: '_id',
			  as: 'renter',
			},
		  },
		  {
			$lookup: {
			  from: 'users',
			  localField: 'lessorId',
			  foreignField: '_id',
			  as: 'lessor',
			},
		  },
		  { $unwind: '$car' }
		])
		.toArray();
	  ctx.body = resultArray[0];
	}
		
}