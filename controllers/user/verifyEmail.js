const { User } = require("../../models/user");
const { schemaValidationError } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw schemaValidationError(404, "Not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verifity: true,
    verificationToken: "",
  });

  res.status(200).json({
    ststaus: "OK",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
