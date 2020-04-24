import * as guard from './guard';
import * as cars from './cars/controller';
import * as rents from './rents/controller';
import * as users from './users/controller';
import * as credit from './credit/controller';
import * as notifications from './notifications/controller';
import * as EReceiptComponent from './Components/EReceipt/index';
import * as RentalComponent from './Components/Rental/index';
import * as AdminComponent from './Components/Admin/index';

// prettier-ignore
export const appRoutes = [
  //* API
  { method: 'get',    path: '/api',                       action: ctx => (ctx.body = 'rentsee API') },
  //* AUTH
  { method: 'post',   path: '/api/register',              action: [users.register] },
  { method: 'post',   path: '/api/login',                 action: [users.login] },
  //* ADMINS
  { method: 'patch',  path: '/api/admin/approveLicense',  action: [guard.loggedIn, AdminComponent.Admininstance.approveLicense] },
  { method: 'patch',  path: '/api/admin/approveCar',      action: [guard.loggedIn, AdminComponent.Admininstance.approveCar] },
  //* USERS
  { method: 'get',    path: '/api/users',                 action: [users.find] },
  { method: 'get',    path: '/api/users/me',              action: [guard.loggedIn, users.profile] },
  { method: 'get',    path: '/api/users/:id',             action: [guard.loggedIn, users.findById] },
  { method: 'patch',  path: '/api/users/me',              action: [guard.loggedIn, users.patchMe] },
  { method: 'get',    path: '/api/profile',               action: [guard.loggedIn, users.profile] },
  { method: 'get',    path: '/api/users/emailVerify/:id/:hash', action: [users.verify] },
  //* CARS
  { method: 'get',    path: '/api/cars',                  action: [cars.find] },
  { method: 'get',    path: '/api/cars/me',               action: [guard.loggedIn, cars.mine] },
  { method: 'get',    path: '/api/cars/me/rent',          action: [guard.loggedIn, cars.rentableMine] },
  { method: 'get',    path: '/api/cars/:id',              action: [cars.findById] },
  { method: 'post',   path: '/api/cars',                  action: [guard.loggedIn, cars.create] },
  { method: 'patch',  path: '/api/cars/:id',              action: [guard.loggedIn, cars.patchById] },
  { method: 'delete', path: '/api/cars/:id',              action: [guard.loggedIn, cars.removeById] },
  //* RENTS
  { method: 'get',    path: '/api/rents',                 action: [guard.loggedIn, rents.find] },
  { method: 'get',    path: '/api/rents/lesseeHistory',   action: [guard.loggedIn, rents.findAsLessee] },
  { method: 'get',    path: '/api/rents/lessorHistory',   action: [guard.loggedIn, rents.findAsLessor] },
  { method: 'get',    path: '/api/rents/search',          action: [rents.search] },
  { method: 'get',    path: '/api/rents/:id',             action: [guard.loggedIn, rents.findById] },
  { method: 'get',    path: '/api/rents/receipt/:id',     action: [guard.loggedIn, EReceiptComponent.EReceiptinstance.getReceipt] },
  { method: 'post',   path: '/api/rents/:id',             action: [guard.loggedIn, rents.create] },
  { method: 'patch',  path: '/api/rents/confirm/:id',     action: [guard.loggedIn, rents.confirm] },
  { method: 'patch',  path: '/api/rents/lessorCancel/:id',action: [guard.loggedIn, rents.lessorCancel] },
  { method: 'patch',  path: '/api/rents/lesseeCancel/:id',action: [guard.loggedIn, rents.lesseeCancel] },
  { method: 'patch',  path: '/api/rents/editPolicy/:id',  action: [guard.loggedIn, RentalComponent.Rentalinstance.editPolicy] },
  { method: 'patch',  path: '/api/rents/receivedCar/:id', action: [guard.loggedIn, RentalComponent.Rentalinstance.receivedCar] },
  { method: 'patch',  path: '/api/rents/returnCar/:id',   action: [guard.loggedIn, RentalComponent.Rentalinstance.returnCar] },
  { method: 'delete', path: '/api/rents/:id',             action: [guard.loggedIn, rents.removeById] },
  { method: 'delete', path: '/api/rents',                 action: [guard.loggedIn, rents._clear] },
  { method: 'post',   path: '/api/rents/:id/creditcard',  action: [guard.loggedIn, credit.creditcard_pay] },
  { method: 'post',   path: '/api/rents/:id/cancel',      action: [guard.loggedIn, credit.creditcard_cancel] },
  //* NOTIFICATION
  { method: 'get',    path: '/api/notifications',         action: [guard.loggedIn, notifications.getAll] },
  { method: 'get',    path: '/api/notificationsCount',    action: [guard.loggedIn, notifications.getCount] },
];
