import ContactsModel from "../models/ContactsModel";
import connection from '../models/connection';
import { IPhoneNumbers, IContact, IContactInfo, IAddContact, IContactModel} from '../interfaces';


export default class ContactsService {
  public ContactsModel: ContactsModel;

  constructor() {
    this.ContactsModel = new ContactsModel(connection);
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
      if (!phoneNumbers) return null;

      const fullData = {...contact, phoneNumbers: phoneNumbers.map(({phone}) => phone) };
      return fullData as IContact;
    } catch (error) {
      throw error;
    }
  }
  
  // TODO: Melhorar a lógica para que a adição de contatos possa ser feita com mais de um telefone por pessoa.
  public async add(contactToAdd: IAddContact): Promise<IContactModel> {
    try {
      const { name, email, image, phone } = contactToAdd;
      await this.preventDuplications(name, email)
      return await this.ContactsModel.add(name, email, image, phone);
    } catch (error) {
      throw error;
    }
  };
  
  // TODO: Melhorar a lógica para que a edição de contatos possa ser feita com mais de um telefone por pessoa.
  public async update(id: number, name: string, email: string, image: string, phone: number): Promise<IContactModel> {
    try {
      return await this.ContactsModel.update(id, name, email, image, phone);
    } catch (error) {
      throw error;
    }
  }
  
  public async exclude(id: number): Promise<IContactModel> {
    try {
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