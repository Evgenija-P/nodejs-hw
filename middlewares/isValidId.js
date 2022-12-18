const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");


const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = createError(400, `${contactId} is not corrent id format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
