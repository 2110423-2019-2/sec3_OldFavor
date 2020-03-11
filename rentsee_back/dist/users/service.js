"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const nodemailer = require("nodemailer");
const db_1 = require("../db");
const jwt = require("../jwt");
function signJWT(rawuser) {
    const user = Object.assign({}, rawuser);
    delete user.password;
    const token = jwt.sign({
        _id: user._id,
        username: user.username
    });
    return { user, token };
}
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = yield db_1.db.users.findOne({ username: user.username });
        if (search) {
            return Promise.reject(`username [${user.username}] is already exist`);
        }
        else {
            const { insertedId } = yield db_1.db.users.insertOne(user);
            return Object.assign(Object.assign({}, signJWT(Object.assign({ _id: insertedId }, user))), { message: 'Register success' });
        }
    });
}
exports.register = register;
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield db_1.db.users.findOne({ username, password });
        console.log('TCL: login -> user', user);
        if (!user || user.password != password) {
            return Promise.reject('username or password is wrong');
        }
        else {
            return Object.assign(Object.assign({}, signJWT(user)), { message: 'Login success' });
        }
    });
}
exports.login = login;
// export async function profile(jwtuser: any) {
//   return await db.users.findOne({ _id: new ObjectID(jwtuser._id) });
// }
function patch(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.db.users.findOneAndUpdate({ _id: new mongodb_1.ObjectID(id) }, { $set: user }, { upsert: false, returnOriginal: false });
    });
}
exports.patch = patch;
function verify(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.db.users.findOneAndUpdate({ _id: new mongodb_1.ObjectID(id) }, { $set: { emailVerified: true } }, { upsert: false, returnOriginal: false });
    });
}
exports.verify = verify;
function sendEmail(email, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const host = 'https://hueco.ml/rentsee/';
        const url = host + 'api/users/emailVerify/' + id + '/' + Math.random().toString(36).substring(7);
        const testAccount = yield nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'sheetplus.income.notifier@gmail.com',
                pass: 'SheetplusIncome1'
            }
        });
        const info = yield transporter.sendMail({
            from: '"RENTSEE" <sheetplus.income.notifier@gmail.com>',
            to: email,
            subject: "RENTSEE: Email Verification",
            text: "Please use this link: " + url,
            html: "<b>Verification URL:</b> <a href='" + url + "'>click</a><br>Or use " + url
        });
    });
}
exports.sendEmail = sendEmail;
function find(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.db.users.find(query).toArray();
    });
}
exports.find = find;
function findOne(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.db.users.findOne(query);
    });
}
exports.findOne = findOne;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return findOne({ _id: new mongodb_1.ObjectID(id) });
    });
}
exports.findById = findById;
//# sourceMappingURL=service.js.map