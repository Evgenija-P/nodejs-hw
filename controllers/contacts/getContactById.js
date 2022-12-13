const contactsMethods = require("../../models/contacts");
const createError = require("http-errors");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactFind = await contactsMethods.getContactById(contactId);
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
