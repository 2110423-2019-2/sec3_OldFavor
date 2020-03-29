import { ObjectID } from 'mongodb';

// prettier-ignore
export interface User {
  _id?             : string | ObjectID | any;
  username         : string;
  password         : string;
  drivingLicense   : string;
  licenseVerified  : boolean;
  email            : string;
  emailVerified    : boolean;
  bankAccountNumber: string;
  address          : string;
  phoneNumber      : string;
  creditCardNumber : string;
}

// prettier-ignore
export interface Rent {
  _id?          : any;
  carId         : string | ObjectID;
  renterId      : string | ObjectID;
  lessorId      : string | ObjectID;
  status        : number; //0=created 1=matched 2=lessorcancel 3=lesseecancel 4=done
  cancelReason  : string;
  pickUpDateTime: Date;
  pickUpLocation: string;
  returnDateTime: Date;
  returnLocation: string;
  pricePerDay   : number;
  totalPrice    : number;
  policy        : string;
  created       : Date;
  matched       : Date;
  
  credit_card   : string;
  credit_date   : Date;
}

// prettier-ignore
export interface Car {
  _id?              : any;
  ownerId           : string | ObjectID;
  licensePlate      : string;
  capacity          : number;
  photoOfCar        : string;
  photoOfCarDocument: string;
  verified          : boolean;
  carModel          : string;
  carType           : string;
  carDescription    : string;
}

// prettier-ignore
export interface Notification {
  _id?              : any;
  to                : string | ObjectID;
  message           : string;
  read              : boolean;
  created           : Date;
}