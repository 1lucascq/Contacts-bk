export interface IAddContact {
  id?: number
  name: string;
  email: string;
  image: string;
  phoneNumbers: number[];
}

export interface IContactInfo {
  id: number;
  name: string;
  email: string;
  image: string;
}

export interface IContact extends IContactInfo{
  phoneNumbers: number[];
}

export interface IPhoneNumbers {
  contact_id: number;
  phone: number;
}

/*
DB_HOSTNAME=us-cdbr-east-05.cleardb.net
DB_USER=be99930bd04b0e
DB_PASSWORD=1dceb3a6
DB_DATABASE=heroku_d099a20d88f2c75
PORT=3306



DB_HOSTNAME=localhost
DB_USERNAME=lucascq
DB_PASSWORD=12345679
DB_DATABASE=Phone_Book
PORT=4000

*/