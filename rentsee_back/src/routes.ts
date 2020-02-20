import * as guard from './guard';
import * as cars from './cars/controller';
import * as rents from './rents/controller';
import * as users from './users/controller';

// prettier-ignore
export const appRoutes = [
  //* API
  { method: 'get',    path: '/api',             action: ctx => (ctx.body = 'rentsee API') },
  //* AUTH
  { method: 'post',   path: '/api/register',    action: [users.register] },
  { method: 'post',   path: '/api/login',       action: [users.login] },
  //* USERS
  { method: 'get',    path: '/api/users',       action: [users.find] },
  { method: 'get',    path: '/api/users/me',    action: [guard.loggedIn, users.profile] },
  { method: 'get',    path: '/api/users/:id',   action: [guard.loggedIn, users.findById] },
  { method: 'patch',  path: '/api/users/me',    action: [guard.loggedIn, users.patchMe] },
  { method: 'get',    path: '/api/profile',     action: [guard.loggedIn, users.profile] },
  //* CARS
  { method: 'get',    path: '/api/cars',        action: [cars.find] },
  { method: 'get',    path: '/api/cars/search', action: [cars.search] },
  { method: 'get',    path: '/api/cars/:id',    action: [cars.findById] },
  { method: 'post',   path: '/api/cars',        action: [guard.loggedIn, cars.create] },
  { method: 'patch',  path: '/api/cars/:id',    action: [guard.loggedIn, cars.patchById] },
  { method: 'delete', path: '/api/cars/:id',    action: [guard.loggedIn, cars.removeById] },
  //* RENTS
  { method: 'get',    path: '/api/rents',       action: [rents.find] },
  { method: 'post',   path: '/api/rents/:id',   action: [guard.loggedIn, rents.create] },
  { method: 'delete', path: '/api/rents/:id',   action: [guard.loggedIn, rents.removeById] },
  { method: 'delete', path: '/api/rents',       action: [guard.loggedIn, /* guard.isAdmin, */ rents._clear] },
];
