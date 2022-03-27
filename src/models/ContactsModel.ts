import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { IContactInfo, IPhoneNumbers, IContact} from '../interfaces';

export default class Contacts {
  public connection: Pool;
  constructor(connection: Pool) {
    this.connection = connection;
  }
  public async addPhoneNumber(contactId:  number, phone: number): Promise<void> {
    try {
      const query = `INSERT INTO phone_numbers (contact_id, phone) VALUES (?, ?);`;
      await this.connection.execute(query, [contactId, phone]);
    } catch (err) {
      throw new Error('Erro do servidor na adição de novo telefone.');
    }
  };

  public async addContact(name: string, email: string, image: string): Promise<IContact> {
    try {
      const query = `INSERT INTO contacts (name, email, image) VALUES (?, ?, ?);`;
      const [result] = await this.connection.execute<ResultSetHeader>(query, [name, email, image]);
      const id: number = result.insertId;
      
      // await this.addPhoneNumber(id, phone);
  
      return { id, name, email, image } as IContact;
    } catch (err) {
      throw new Error('Erro do servidor na adição de novo contato.');
    }
  };

  public async getAll(): Promise<IContactInfo[]> {
    try {
      const query = 'SELECT * FROM contacts'
      const result = await this.connection.execute<RowDataPacket[]>(query);
      const [users] = result;
      return users as IContactInfo[];
    } catch (err) {
      throw new Error('Erro do servidor na requisição getAll do model.');
    }
  }
  
  public async getAllPhoneNumbers(): Promise<IPhoneNumbers[]> {
    try {
      const query = 'SELECT * FROM phone_numbers;'
      const result = await this.connection.execute<RowDataPacket[]>(query);
      const [phones] = result;
      return phones as IPhoneNumbers[];
    } catch (err) {
      throw new Error('Erro do servidor na requisição do getAllPhoneNumbers do model.');
    }
  };

  public async getById(id: number): Promise<IContactInfo | null> {
    try {
      const query = 'SELECT * FROM contacts WHERE id = ?';
      const [result] = await this.connection.execute<RowDataPacket[]>(query,[id]);
      const [user] = result;
      if (!result.length) return null;
      return user as IContactInfo;
    } catch (err) {
      throw new Error('Erro do servidor na requisição getByID do model.');
    }
  };

  public async getPhoneNumberById(id: number): Promise<IPhoneNumbers[] | null> {
    try {
      const query = 'SELECT * FROM phone_numbers WHERE contact_id = ?';
      const [result] = await this.connection.execute<RowDataPacket[]>(query, [id]);
      if (!result.length) return null;
      return result as IPhoneNumbers[];
    } catch (err) {
      throw new Error('Erro do servidor na requisição do getPhoneNumberById do model.');
    }
  };

  // A implementação aqui é de uma tupla, onde o primeiro item é o novo telefone e o segundo o número antigo a ser alterado.
  public async updatePhoneNumber(contactId: number, phoneNumbers: number[]):Promise<void> {
    try {
      const query = 'UPDATE phone_numbers SET phone = ? WHERE contact_id = ? AND phone = ?;';
      await this.connection.execute<ResultSetHeader>(query, [phoneNumbers[1], contactId, phoneNumbers[0]]);
    } catch (err) {
      throw new Error('Erro do servidor na atualização de telefone do model.');
    }
  };
  
  public async updateContact(id: number, name: string, email: string, image: string, phoneNumbers: number[])
    : Promise<null> {
    try {
      const query = 'UPDATE contacts SET name = ?, email = ?, image = ? WHERE id = ?;';
      await this.connection.execute(query,[name, email, image, id]);
      
      await this.updatePhoneNumber(id, phoneNumbers);

      return null;
    } catch (err) {
      throw new Error('Erro do servidor na atualização de contato do model.');
    }
  };
  
  public async exclude(id: number): Promise<IContact> {
    try {
      const contact = await this.getById(id);
      if (!contact) throw new Error('404:Id não encontrado! Confira os dados da requisição.');

      const queryPhone = 'DELETE FROM phone_numbers WHERE contact_id = ?;'
      const queryContact = 'DELETE FROM contacts WHERE id = ?;'
  
      await this.connection.execute(queryPhone, [id]);
      await this.connection.execute(queryContact, [id]);
      return contact as IContact;
    } catch (err) {
      throw new Error('Erro do servidor na exclusão de contato do model.');
    }
  };

}
