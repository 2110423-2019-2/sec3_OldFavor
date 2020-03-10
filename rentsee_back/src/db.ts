import { Collection } from 'mongodb';

import {
  Car,
  Rent,
  User,
  Notification,
} from './model';
export const db = {
  notifications:  null as Collection<Notification>,
  users: null as Collection<User>,
  rents: null as Collection<Rent>,
  cars:  null as Collection<Car>,
};
