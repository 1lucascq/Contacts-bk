export interface IContactInfo {
  id: number;
  name: string;
  email: string;
  image: string;
}

export interface IPhoneNumbers {
  contact_id: number;
  phone: number;
}

export interface IContactModel extends IContactInfo{
  phone: number;
}

export interface IContact extends IContactInfo{
  phoneNumbers: number[];
}

export interface IAddContact {
  name: string;
  email: string;
  image: string;
  phone: number;
}

/*
TODO:
  1. Só da pra adicionar contatos com 1 número de telefone.
    --> Organizar para que seja possível adicionar contatos com mais de um telefone

  2. Testar

  3. Arrumar todos os IContactModel
*/