import {
  FilterQuery,
  ObjectID,
} from 'mongodb';
import * as nodemailer from 'nodemailer';
import { db } from '../db';
import * as jwt from '../jwt';
import { User } from '../model';

function signJWT(rawuser: User) {
  const user: User = { ...rawuser };
  delete user.password;
  const token = jwt.sign({
    _id: user._id,
    username: user.username
  });
  return { user, token };
}

export async function register(user: User) {
  const search = await db.users.findOne({ username: user.username });
  if (search) {
    return Promise.reject(`username [${user.username}] is already exist`);
  } else {
    const { insertedId } = await db.users.insertOne(user);
    return { ...signJWT({ _id: insertedId, ...user }), message: 'Register success' };
  }
}

export async function login(username: string, password: string) {
  const user: User = await db.users.findOne({ username, password });
  console.log('TCL: login -> user', user);
  if (!user || user.password != password) {
    return Promise.reject('username or password is wrong');
  } else {
    return { ...signJWT(user), message: 'Login success' };
  }
}

// export async function profile(jwtuser: any) {
//   return await db.users.findOne({ _id: new ObjectID(jwtuser._id) });
// }

export async function patch(id: string, user: User) {
  return await db.users.findOneAndUpdate(
    { _id: new ObjectID(id) },
    { $set: user },
    { upsert: false, returnOriginal: false }
  );
}

export async function verify(id: string) {
  return await db.users.findOneAndUpdate(
    { _id: new ObjectID(id) },
    { $set: {emailVerified:true} },
    { upsert: false, returnOriginal: false }
  );
}

export async function sendEmail(email: string, id: string) {
  const host = 'https://hueco.ml/rentsee/';
  const url = host + 'api/users/emailVerify/' + id +'/' + Math.random().toString(36).substring(7);
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'sheetplus.income.notifier@gmail.com',
      pass: 'SheetplusIncome1'
    }
  });
  const info = await transporter.sendMail({
    from: '"RENTSEE" <sheetplus.income.notifier@gmail.com>',
    to: email,
    subject: "RENTSEE: Email Verification",
    text: "Please use this link: "+url,
    html: "<b>Verification URL:</b> <a href='"+url+"'>click</a><br>Or use "+url
  });
}

export async function find(query: FilterQuery<User>) {
  return await db.users.find(query).toArray();
}
export async function findOne(query: FilterQuery<User>) {
  return await db.users.findOne(query);
}
export async function findById(id: string) {
  return findOne({ _id: new ObjectID(id) });
}
