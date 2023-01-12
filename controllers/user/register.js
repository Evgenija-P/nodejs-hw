const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/user");
const { schemaValidationError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw schemaValidationError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const registerUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

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
