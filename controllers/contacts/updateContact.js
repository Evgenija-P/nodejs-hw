const contactsMethods = require("../../models/contacts");
const createError = require("http-errors");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contactUpdate = await contactsMethods.updateContact(
    contactId,
    req.body
  );
  if (!contactUpdate) {
    throw createError(404, `Contact with id = ${contactId} not found`);
  }
  res.json({
    ststaus: "success",
    code: 200,
    message: "contact updated",
    data: { contactUpdate },
  });
};
module.exports = updateContact;
