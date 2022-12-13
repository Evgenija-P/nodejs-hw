const shortid = require("shortid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const findId = String(contactId);
  const data = await fs.readFile(contactsPath);
  const contactFind = JSON.parse(data).find((contact) => contact.id === findId);
  if (!contactFind) {
    return null;
  }
  return contactFind;
}

async function removeContact(id) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const idFind = contacts.findIndex((contact) => contact.id === id);

  if (idFind !== -1) {
    const newContacts = contacts.filter((_, index) => index !== idFind);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  }
  return contacts[idFind];
}

async function addContact({ name, email, phone }) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const contactNew = { id: shortid.generate(), name, email, phone };
  contacts.push(contactNew);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contactNew;
}

async function updateContact(contactId, dataUpdate) {
  const findId = String(contactId);
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const idFind = contacts.findIndex((contact) => contact.id === findId);
  contacts[idFind] = { contactId, ...dataUpdate };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  if (idFind === -1) {
    return null;
  }
  return contacts[idFind];
}

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
};
