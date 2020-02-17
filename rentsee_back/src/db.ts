import { Collection } from 'mongodb';

import {
  Car,
  Rent,
  User,
} from './model';

export const db = {
  users: null as Collection<User>,
  rents: null as Collection<Rent>,
  cars:  null as Collection<Car>
};
