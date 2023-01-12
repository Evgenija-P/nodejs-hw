const { User } = require("../../models/user");
const { schemaValidationError, sendEmail } = require("../../helpers");

const pathVerifikation = "http://localhost:3000/api/users/verify";

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!email) {
    throw schemaValidationError(400, "Missing required field email");
  }

  if (!user) {
    throw schemaValidationError(404, "User not found");
  }

  if (user.verify) {
    res.status(400).json({
      ststaus: "Bad Request",
      code: 400,
      message: "Verification has already been passed",
    });
  }

  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<a href="${pathVerifikation}/${user.verificationToken}" target="_blank">Please click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    ststaus: "Created",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
