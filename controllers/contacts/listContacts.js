const { Contact } = require("../../models/contact");

const listContacts = async (r_, res) => {
  const contactsList = await Contact.find({}, "-createdAt, -updatedAt");
  res.json({
    ststaus: "success",
    code: 200,
    message: "contacts received",
    data: { contactsList },
  });
};

module.exports = listContacts;
