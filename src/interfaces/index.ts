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
