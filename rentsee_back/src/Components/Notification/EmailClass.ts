import { db } from '../../db'
import { Rent } from '../../model'
import { ObjectID } from 'mongodb'
import { Context } from 'koa'
import * as nodemailer from 'nodemailer'

export class Email {
	
	sendMail = async(elem: any) => {
		const transporter = nodemailer.createTransport({
		  host: "smtp.gmail.com",
		  port: 465,
		  secure: true,
		  auth: {
		    user: 'sheetplus.income.notifier@gmail.com',
		    pass: 'npoeqegwjzeyfksz'
		  }
		});
		return await transporter.sendMail(elem);
	}
		
}