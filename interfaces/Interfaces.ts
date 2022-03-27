export interface IUser {
  id?: number;
  name: string;
  email: string;
  image: string;
}

export interface IPhoneNumbers {
  id?: number;
  phone: number;
}

export interface IFullUser extends IUser{
  phone: number;
}
