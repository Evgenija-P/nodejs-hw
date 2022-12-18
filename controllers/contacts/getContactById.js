const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const contactFind = await Contact.findById(contactId);
  if (!contactFind) {
    throw createError(404, `Contact with id = ${contactId} not found`);
  }
  res.json({
    ststaus: "success",
    code: 200,
    message: "contact found",
    data: { contactFind },
  });
};

module.exports = getContactById;
