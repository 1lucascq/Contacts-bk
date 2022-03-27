import ContactsModel from "../models/ContactsModel";
import connection from '../models/connection';
import { IPhoneNumbers, IContact, IContactInfo, IAddContact} from '../interfaces';


export default class ContactsService {
  public ContactsModel: ContactsModel;

  constructor() {
    this.ContactsModel = new ContactsModel(connection);
  }

  public async addPhones(id: number, phoneNumbers: number[]) {
    phoneNumbers.forEach(phone => this.ContactsModel.addPhoneNumber(id, phone))

  }

  public getPhoneNumbers(id: number, phoneNumbers: IPhoneNumbers[]) {
    return phoneNumbers.filter(({contact_id}) => contact_id === id).map(({phone}) => phone);
  };
  
  public async preventDuplications(name: string, email: string): Promise<boolean> {
    const allContacts: IContact[] = await this.getAllContacts();
    const nameAlreadyExists = allContacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
    if (nameAlreadyExists) throw new Error('409:Você já possui um contato com este nome!');
  
    const emailAlreadyExists = allContacts.find((contact) => contact.email.toLowerCase() === email.toLowerCase());
    if (emailAlreadyExists) throw new Error('409:Você já possui um contato com este email!');
    
    return true;
  }
  


  public async getAllContacts(): Promise<IContact[]> {
    try {
      const contacts: IContactInfo[] = await this.ContactsModel.getAll();
      const phoneNumbers: IPhoneNumbers[] = await this.ContactsModel.getAllPhoneNumbers();
      const fullData = contacts.map((cont) => ({...cont, phoneNumbers: this.getPhoneNumbers(cont.id, phoneNumbers) }));
      return fullData as IContact[];
    } catch (error) {
      throw error;
    }
  }


  public async getById(id: number): Promise<IContact | null> {
    try {
      const contact: IContactInfo | null = await this.ContactsModel.getById(id);
      
      if (!contact) return null;
      
      const phoneNumbers = await this.ContactsModel.getPhoneNumberById(id);
      console.log(phoneNumbers)

      if (!phoneNumbers) return null;

      const fullData = {...contact, phoneNumbers: phoneNumbers.map(({phone}) => phone) };
      return fullData as IContact;
    } catch (error) {
      throw error;
    }
  }
  
  public async add(contactToAdd: IAddContact): Promise<IContact> {
    try {
      const { name, email, image, phoneNumbers } = contactToAdd;
      await this.preventDuplications(name, email)
      const addContactRes = await this.ContactsModel.addContact(name, email, image);
      
      this.addPhones(addContactRes.id, phoneNumbers)
      // if (phoneNumbers.length) {
      //   phoneNumbers.forEach(phone => { this.ContactsModel.addPhoneNumber(addContactRes.id, phone)
      //   });
      return { ...addContactRes, phoneNumbers } as IContact
    } catch (error) {
      throw error;
    }
  };
  
  public async update(id: number, name: string, email: string, image: string, phoneNumbers: number[]): Promise<IContact> {
    try {
      await this.ContactsModel.updateContact(id, name, email, image, phoneNumbers);

      const result = await this.getById(id);
      if (!result) throw new Error('O contato informado para update não existe no banco de dados') ;
      return result as IContact;
    } catch (error) {
      throw error;
    }
  }
  
  public async exclude(id: number): Promise<IContact | null> {
    try {
      const contact: IContactInfo | null = await this.ContactsModel.getById(id);
      if (!contact) return null;
      return await this.ContactsModel.exclude(id);
    } catch (error) {
      throw error;
    }
  }
  



}



// async function preventDuplications (name, email) {
//   const allContacts = await getAllPhoneNumbers();
//   const nameAlreadyExists = allContacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
//   if (nameAlreadyExists) throw new Error('409:Você já possui um contato com este nome!');

//   const emailAlreadyExists = allContacts.find((contact) => contact.email.toLowerCase() === email.toLowerCase());
//   if (emailAlreadyExists) throw new Error('409:Você já possui um contato com este email!');
  
//   return true;
// }

// function getPhoneNumbers (id, phoneNumbers) {
//   return phoneNumbers.filter(({contact_id}) => contact_id === id).map(({phone}) => phone);
// };

// async function getAllPhoneNumbers() {
//   try {
//     const contacts = await this.ContactsModel.getAll();
//     const phoneNumbers = await this.ContactsModel.getAllPhoneNumbers();
//     const fullData = contacts.map((cont) => ({...cont, phoneNumbers: getPhoneNumbers(cont.id, phoneNumbers) }));
//     return fullData
//   } catch (error) {
//     throw error;
//   }
// }

// async function getById(id) {
//   try {
//     const contact = await this.ContactsModel.getById(id);
//     const phoneNumbers = await this.ContactsModel.getPhoneNumberById(id);
//     const fullData = {...contact, phoneNumbers: phoneNumbers.map(({phone}) => phone) };
//     return fullData;
//   } catch (error) {
//     throw error;
//   }
// }

// async function add({ name, email, image, phone }) {
//   try {
//     await preventDuplications(name, email)
//     return await this.ContactsModel.add(name, email, image, phone);
//   } catch (error) {
//     throw error;
//   }
// };

// async function update(id, name, email, image, phone) {
//   try {
//     return await this.ContactsModel.update(id, name, email, image, phone);
//   } catch (error) {
//     throw error;
//   }
// }

// async function exclude(id) {
//   try {
//     return await this.ContactsModel.exclude(id);
//   } catch (error) {
//     throw error;
//   }
// }


// module.exports = { add, getAll, getById, update, exclude };