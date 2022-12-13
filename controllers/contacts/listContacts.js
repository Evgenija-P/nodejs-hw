const contactsMethods = require("../../models/contacts");

const listContacts = async (req, res) => {
  const contactsList = await contactsMethods.listContacts();
  res.json({
    ststaus: "success",
    code: 200,
    message: "contacts received",
    data: { contactsList },
  });
};

module.exports = listContacts;
