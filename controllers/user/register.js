const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const { schemaValidationError, sendEmail } = require("../../helpers");

const pathVerifikation = "http://localhost:3000/api/users/verify";

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw schemaValidationError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid(5);
  const registerUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<a href="${pathVerifikation}/${verificationToken}" target="_blank">Please click to verify your email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(201).json({
    ststaus: "Created",
    code: 201,
    message: "user registered",
    data: {
      registerUser: {
        email: registerUser.email,
        subscription: registerUser.subscription,
      },
    },
  });
};

module.exports = register;
