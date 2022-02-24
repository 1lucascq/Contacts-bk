const connection = require("./connection");

const add = async (name, email, image) => {
  try {
    const query = `INSERT INTO Phone_Book.contacts (name, email, image) VALUES (?, ?, ?);`;
    const [result] = await connection.execute(query, [name, email, image]);

    return { id: result.insertId, name, email, image };
  } catch (err) {
    throw err;
  }
};

const getAll = async () => {
  try {
    const [contacts] = await connection.execute(
      "SELECT * FROM Phone_Book.contacts"
    );
    return contacts;
  } catch (err) {
    throw err;
  }
};

const getAllPhoneNumbers = async () => {
  try {
    const [phones] = await connection.execute(
      "SELECT * FROM Phone_Book.phone_numbers;"
    );
    return phones;
  } catch (err) {
    throw err;
  }
};

const getById = async (id) => {
  try {
    const [result] = await connection.execute(
      "SELECT * FROM Phone_Book.contacts WHERE id = ?",
      [id]
    );
    if (!result.length) return null;
    return result[0];
  } catch (err) {
    throw err;
  }
};

const getPhoneNumberById = async (id) => {
  try {
    const [phone] = await connection.execute(
      "SELECT * FROM Phone_Book.phone_numbers WHERE contact_id = ?",
      [id]
    );
    if (!phone.length) return null;
    return phone;
  } catch (err) {
    throw err;
  }
};

const update = async (id, name, email, image) => {
  try {
    await connection.execute(
      "UPDATE Phone_Book.contacts SET name = ?, email = ?, image = ? WHERE id = ?",
      [name, email, image, id]
    );
    return { id, name, email, image };
  } catch (err) {
    throw err;
  }
};

const exclude = async (id) => {
  try {
    const contact = await getById(id);
    if (!contact) return {};
    await connection.execute("DELETE FROM Phone_Book.contacts WHERE id = ?", [
      id,
    ]);
    return contact;
  } catch (err) {
    throw err;
  }
};

module.exports = { add, getAll, getAllPhoneNumbers, getById, getPhoneNumberById, update, exclude };
