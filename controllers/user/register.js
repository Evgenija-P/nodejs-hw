const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");
const { catchErrors } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (user) {
    throw catchErrors(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const registerUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    ststaus: "success",
    code: 201,
    message: "user registered",
    data: { email: registerUser.email },
  });
};

module.exports = register;
