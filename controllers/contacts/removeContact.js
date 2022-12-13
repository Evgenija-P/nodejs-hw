const contactsMethods = require("../../models/contacts");
const createError = require("http-errors");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await contactsMethods.removeContact(contactId);
  if (!deleteContact) {
    throw createError(404, `Contact with id = ${contactId} not found`);
  }
  res.json({
    ststaus: "success",
    code: 200,
    message: "contact deleted",
    data: { deleteContact },
  });
};
module.exports = removeContact;
