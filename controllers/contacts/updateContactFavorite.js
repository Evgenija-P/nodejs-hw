const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const updateContactFavorite = async (req, res) => {
  const { contactId } = req.params;
  const contactUpdate = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
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
module.exports = updateContactFavorite;
