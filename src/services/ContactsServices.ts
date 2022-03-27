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
    if (nameAlreadyExists) throw new Error('409:You already have a contact with this name!');
  
    const emailAlreadyExists = allContacts.find((contact) => contact.email.toLowerCase() === email.toLowerCase());
    if (emailAlreadyExists) throw new Error('409:You already have a contact with this email!');
    
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
  
  public async add(contactToAdd: IAddContact): Promise<IContact> {
    try {
      const { name, email, image, phoneNumbers } = contactToAdd;
      console.log(phoneNumbers)
      await this.preventDuplications(name, email)
      const addContactRes = await this.ContactsModel.addContact(name, email, image);
      
      this.addPhones(addContactRes.id, phoneNumbers)
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
