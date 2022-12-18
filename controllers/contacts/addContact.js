const { Contact } = require("../../models/contact");

const addContact = async (req, res) => {
  const contactsAdd = await Contact.create(req.body);
  res.status(201).json({
    ststaus: "success",
    code: 201,
    message: "contact was added",
    data: { contactsAdd },
  });
};

module.exports = addContact;
