const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let contactsList = await Contact.find({ owner }, { skip, limit }).populate(
    "owner",
    "email"
  );

  if (favorite) {
    contactsList = await Contact.find(
      { owner, favorite },
      { skip, limit }
    ).populate("owner", "email");
  }

  res.json({
    ststaus: "success",
    code: 200,
    message: "contacts received",
    data: { contactsList },
  });
};

module.exports = listContacts;
