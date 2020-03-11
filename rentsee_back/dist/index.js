"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const _ = require("lodash");
const config_1 = require("./config");
const db_1 = require("./db");
const routes_1 = require("./routes");
const app = new Koa();
const router = new Router();
// @ts-ignore
routes_1.appRoutes.forEach(route => router[route.method](..._.flatten([route.path, route.action])));
const server = app
    .use(require('koa-bodyparser')())
    .use(require('koa-logger')())
    .use(require('koa2-cors')())
    .use(require('koa-jwt')({ secret: config_1.default.jwt.secret, passthrough: true }))
    .use(require('koa-mongo')(config_1.default.mongo))
    .use((ctx, next) => {
    db_1.db.cars = ctx.db.collection('cars');
    db_1.db.users = ctx.db.collection('users');
    db_1.db.rents = ctx.db.collection('rents');
    db_1.db.notifications = ctx.db.collection('notifications');
    db_1.db.users.createIndex('username', { unique: true });
    return next();
})
    .use((ctx, next) => next().catch(err => {
    console.error(err);
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = { message: (_.isString(err) ? err : err.message) || 'Error is happen' };
}))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(config_1.default.port, () => {
    console.log(`Koa application is up and running on http://0.0.0.0:${config_1.default.port}`);
});
//# sourceMappingURL=index.js.map