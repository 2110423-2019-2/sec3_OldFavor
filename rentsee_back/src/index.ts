import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as _ from 'lodash';

import config from './config';
import { db } from './db';
import { appRoutes } from './routes';

const app = new Koa();
const router = new Router();

// @ts-ignore
appRoutes.forEach(route => router[route.method](..._.flatten([route.path, route.action])));

const server = app
  .use(require('koa-bodyparser')())
  .use(require('koa-logger')())
  .use(require('koa2-cors')())
  .use(require('koa-jwt')({ secret: config.jwt.secret, passthrough: true }))
  .use(require('koa-mongo')(config.mongo))
  .use((ctx, next) => {
    db.cars = ctx.db.collection('cars');
    db.users = ctx.db.collection('users');
    db.rents = ctx.db.collection('rents');
    db.users.createIndex('username', { unique: true });
    return next();
  })
  .use((ctx, next) =>
    next().catch(err => {
      console.error(err);
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = { message: (_.isString(err) ? err : err.message) || 'Error is happen' };
    })
  )
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port, () => {
    console.log(`Koa application is up and running on http://0.0.0.0:${config.port}`);
  });
