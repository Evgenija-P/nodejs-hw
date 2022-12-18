const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndRemove(contactId);
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
