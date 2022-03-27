import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { IContactInfo, IPhoneNumbers, IContactModel} from '../interfaces/Interfaces';

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

  public async add(name: string, email: string, image: string, phone: number): Promise<IContactModel> {
    try {
      const query = `INSERT INTO contacts (name, email, image) VALUES (?, ?, ?);`;
      const [result] = await this.connection.execute<ResultSetHeader>(query, [name, email, image]);
      const id: number = result.insertId;
      await this.addPhoneNumber(id, phone);
  
      return { id, name, email, image, phone } as IContactModel;
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
      const [phone] = result;
      if (!phone.length) return null;
      return phone as IPhoneNumbers[];
    } catch (err) {
      throw new Error('Erro do servidor na requisição do getPhoneNumberById do model.');
    }
  };

  public async updatePhoneNumber(contactId: number, phone: number):Promise<void> {
    try {
      const query = 'UPDATE phone_numbers SET phone = ? WHERE contact_id = ?';
      await this.connection.execute(query, [phone, contactId]);
  
    } catch (err) {
      throw new Error('Erro do servidor na atualização de telefone do model.');
    }
  };
  
  public async update(id: number, name: string, email: string, image: string, phone: number)
    : Promise<IContactModel> {
    try {
      const query = 'UPDATE contacts SET name = ?, email = ?, image = ? WHERE id = ?;';
      await this.connection.execute(query,[name, email, image, id]);
      await this.updatePhoneNumber(id, phone)
      return { id, name, email, image, phone } as IContactModel;
    } catch (err) {
      throw new Error('Erro do servidor na atualização de contato do model.');
    }
  };
  
  public async exclude(id: number): Promise<IContactModel> {
    try {
      const contact = await this.getById(id);
      if (!contact) throw new Error('404:Id não encontrado! Confira os dados da requisição.');

    // TODO: ACHO QUE POR CAUSA DO ON DELETE CASCADE O COISO VAI BUGAR TUDO E VAI SER MELHOR EU TESTAR ANTES
    // FIXME: PRA CONSERTAR É SÓ DELETAR O queryPhone PQ O OUTRO VAI DELETAR AUTOMAGICAMENTE
    
      const queryPhone = 'DELETE FROM phone_numbers WHERE contact_id = ?;'
      const queryContact = 'DELETE FROM contacts WHERE id = ?;'
  
      await this.connection.execute(queryPhone, [id]);
      await this.connection.execute(queryContact, [id]);
      return contact as IContactModel;
    } catch (err) {
      throw new Error('Erro do servidor na exclusão de contato do model.');
    }
  };

}

// const connection = require('./connection');

// const addPhoneNumber = async (contactId, phone) => {
//   try {
//     const query = `INSERT INTO phone_numbers (contact_id, phone) VALUES (?, ?);`;
//     await connection.execute(query, [contactId, phone]);

//     return { contactId, phone };
//   } catch (err) {
//     throw new Error('Erro do servidor na adição de novo telefone.');
//   }
// };

// const add = async (name, email, image, phone) => {
//   try {
//     const query = `INSERT INTO contacts (name, email, image) VALUES (?, ?, ?);`;
//     const [result] = await connection.execute(query, [name, email, image]);
//     const id = result.insertId;
//     await addPhoneNumber(id, phone);

//     return { id, name, email, image, phone };
//   } catch (err) {
//     throw new Error('Erro do servidor na adição de novo contato.');
//   }
// };

// const getAll = async () => {
//   try {
//     const [contacts] = await this.connection.execute(
//       'SELECT * FROM contacts'
//     );
//     return contacts;
//   } catch (err) {
//     throw new Error('Erro do servidor na requisição getAll do model.');
//   }
// };

// const getAllPhoneNumbers = async () => {
//   try {
//     const [phones] = await this.connection.execute(
//       'SELECT * FROM phone_numbers;'
//     );
//     return phones;
//   } catch (err) {
//     throw new Error('Erro do servidor na requisição do getAllPhoneNumbers do model.');
//   }
// };

// const getById = async (id) => {
//   try {
//     const [result] = await this.connection.execute(
//       'SELECT * FROM contacts WHERE id = ?',
//       [id]
//     );
//     if (!result.length) return null;
//     return result[0];
//   } catch (err) {
//     throw new Error('Erro do servidor na requisição getByID do model.');
//   }
// };

// const getPhoneNumberById = async (id) => {
//   try {
//     const [phone] = await this.connection.execute(
//       'SELECT * FROM phone_numbers WHERE contact_id = ?',
//       [id]
//     );
//     if (!phone.length) return null;
//     return phone;
//   } catch (err) {
//     throw new Error('Erro do servidor na requisição do getPhoneNumberById do model.');
//   }
// };

// const updatePhoneNumber = async (contactId, phone) => {
//   try {
//     const query = 'UPDATE phone_numbers SET phone = ? WHERE contact_id = ?';
//     await this.connection.execute(query, [phone, contactId]);

//     return { contactId, phone };
//   } catch (err) {
//     throw new Error('Erro do servidor na atualização de telefone do model.');
//   }
// };

// const update = async (id, name, email, image, phone) => {
//   console.log({id, name, email, image, phone})
//   try {
//     const query = 'UPDATE contacts SET name = ?, email = ?, image = ? WHERE id = ?;';
//     await this.connection.execute(query,[name, email, image, +id]);
//     await updatePhoneNumber(id, phone)
//     return { id, name, email, image, phone };
//   } catch (err) {
//     throw new Error('Erro do servidor na atualização de contato do model.');
//   }
// };

// const exclude = async (id) => {
//   try {
//     const contact = await getById(id);
//     if (!contact) throw new Error('404:Id não encontrado! Confira os dados da requisição.');
//     const queryPhone = 'DELETE FROM phone_numbers WHERE contact_id = ?;'
//     const queryContact = 'DELETE FROM contacts WHERE id = ?;'

//     await this.connection.execute(queryPhone, [id]);
//     await this.connection.execute(queryContact, [id]);
//     return contact;
//   } catch (err) {
//     throw new Error('Erro do servidor na exclusão de contato do model.');
//   }
// };
// module.exports = { add, getAll, getAllPhoneNumbers, getById, getPhoneNumberById, update, exclude };
