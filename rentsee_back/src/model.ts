import { ObjectID } from 'mongodb';

export interface User {
  _id?             : string | ObjectID | any;
  username         : string;
  password         : string;
  drivingLisense   : string;
  email            : string;
  bankAccountNumber: string;
  address          : string;
  phoneNumber      : string;
  creditCardNumber : string;
}

export interface Rent {
  _id?          : any;
  carId         : string | ObjectID;
  renterId      : string | ObjectID;
  lessorId      : string | ObjectID;
  pickUpDateTime: Date;
  pickUpLocation: string;
  returnDateTime: Date;
  returnLocation: string;
}

export interface Car {
  _id?              : any;
  ownerId           : string | ObjectID;
  licensePlate      : string;
  capacity          : number;
  photoOfCar        : string;
  photoOfCarDocument: string;
  carModel          : string;
  carType           : string;
  carDescription    : string;
  pricePerDay       : number;
}
