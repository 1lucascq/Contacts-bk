const connection = require("./connection");

const addPhoneNumber = async (contactId, phone) => {
  try {
    const query = `INSERT INTO phone_numbers (contact_id, phone) VALUES (?, ?);`;
    await connection.execute(query, [contactId, phone]);

    return { contactId, phone };
  } catch (err) {
    throw new Error('Erro do servidor na adição de novo telefone.');
  }
};

const add = async (name, email, image, phone) => {
  try {
    const query = `INSERT INTO contacts (name, email, image) VALUES (?, ?, ?);`;
    const [result] = await connection.execute(query, [name, email, image]);
    const id = result.insertId;
    await addPhoneNumber(id, phone);

    return { id, name, email, image, phone };
  } catch (err) {
    throw new Error('Erro do servidor na adição de novo contato.');
  }
};

const getAll = async () => {
  try {
    const [contacts] = await connection.execute(
      "SELECT * FROM contacts"
    );
    return contacts;
  } catch (err) {
    throw new Error('Erro do servidor na requisição getAll do model.');
  }
};

const getAllPhoneNumbers = async () => {
  try {
    const [phones] = await connection.execute(
      "SELECT * FROM phone_numbers;"
    );
    return phones;
  } catch (err) {
    throw new Error('Erro do servidor na requisição do getAllPhoneNumbers do model.');
  }
};

const getById = async (id) => {
  try {
    const [result] = await connection.execute(
      "SELECT * FROM contacts WHERE id = ?",
      [id]
    );
    if (!result.length) return null;
    return result[0];
  } catch (err) {
    throw new Error('Erro do servidor na requisição getByID do model.');
  }
};

const getPhoneNumberById = async (id) => {
  try {
    const [phone] = await connection.execute(
      "SELECT * FROM phone_numbers WHERE contact_id = ?",
      [id]
    );
    if (!phone.length) return null;
    return phone;
  } catch (err) {
    throw new Error('Erro do servidor na requisição do getPhoneNumberById do model.');
  }
};

const updatePhoneNumber = async (contactId, phone) => {
  try {
    const query = "UPDATE phone_numbers SET phone = ? WHERE contact_id = ?";
    await connection.execute(query, [phone, contactId]);

    return { contactId, phone };
  } catch (err) {
    throw new Error('Erro do servidor na atualização de telefone do model.');
  }
};

const update = async (id, name, email, image, phone) => {
  try {
    const query = "UPDATE contacts SET name = ?, email = ?, image = ? WHERE id = ?;";
    await connection.execute(query,[name, email, image, id]);
    await updatePhoneNumber(id, phone)
    return { id, name, email, image, phone };
  } catch (err) {
    throw new Error('Erro do servidor na atualização de contato do model.');
  }
};

const exclude = async (id) => {
  try {
    const contact = await getById(id);
    if (!contact) throw new Error('404:Id não encontrado! Confira os dados da requisição.');
    const queryPhone = 'DELETE FROM phone_numbers WHERE contact_id = ?;'
    const queryContact = 'DELETE FROM contacts WHERE id = ?;'

    await connection.execute(queryPhone, [id]);
    await connection.execute(queryContact, [id]);
    return contact;
  } catch (err) {
    throw new Error('Erro do servidor na exclusão de contato do model.');
  }
};

module.exports = { add, getAll, getAllPhoneNumbers, getById, getPhoneNumberById, update, exclude };
