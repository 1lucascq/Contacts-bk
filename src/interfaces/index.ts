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
TODO:
  1. Só da pra adicionar contatos com 1 número de telefone.
    --> Organizar para que seja possível adicionar contatos com mais de um telefone

  2. Testar

  3. Arrumar todos os IContactModel


DB_HOSTNAME=us-cdbr-east-05.cleardb.net
DB_USER=be99930bd04b0e
DB_PASSWORD=1dceb3a6
DB_DATABASE=heroku_d099a20d88f2c75
DB_PORT=3306

*/