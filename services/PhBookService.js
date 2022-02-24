const PhBookModel = require('../models/PhBookModel');


async function preventDuplications (name, email) {
  const allContacts = await getAll();
  const nameAlreadyExists = allContacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
  if (nameAlreadyExists) throw new Error('409:Você já possui um contato com este nome!');

  const emailAlreadyExists = allContacts.find((contact) => contact.email.toLowerCase() === email.toLowerCase());
  if (emailAlreadyExists) throw new Error('409:Você já possui um contato com este email!');
  
  return true;
}

function getPhoneNumbers (id, phoneNumbers) {
  return phoneNumbers.filter(({contact_id}) => contact_id === id).map(({phone}) => phone);
};

async function getAll() {
  try {
    const contacts = await PhBookModel.getAll();
    const phoneNumbers = await PhBookModel.getAllPhoneNumbers();
    const fullData = contacts.map((cont) => ({...cont, phoneNumbers: getPhoneNumbers(cont.id, phoneNumbers) }));
    return fullData
  } catch (error) {
    throw error;
  }
}

async function getById(id) {
  try {
    const contact = await PhBookModel.getById(id);
    const phoneNumbers = await PhBookModel.getPhoneNumberById(id);
    const fullData = {...contact, phoneNumbers: phoneNumbers.map(({phone}) => phone) };
    return fullData;
  } catch (error) {
    throw error;
  }
}

async function add({ name, email, image }) {
  try {
    await preventDuplications(name, email)
    return await PhBookModel.add(name, email, image);
  } catch (error) {
    throw error;
  }
};

async function update(id, name, email, image) {
  try {
    await preventDuplications(name, email)
    return await PhBookModel.update(id, name, email, image);
  } catch (error) {
    throw error;
  }
}

async function exclude(id) {
  try {
    return await PhBookModel.exclude(id);
  } catch (error) {
    throw error;
  }
}


module.exports = { add, getAll, getById, update, exclude };