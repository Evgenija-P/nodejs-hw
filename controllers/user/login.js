const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { catchErrors } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const loginUser = await User.findOne({ email });
  if (!loginUser) {
    throw catchErrors(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, loginUser.password);
  if (!passwordCompare) {
    throw catchErrors(401, "Email or password invalid");
  }

  const payload = {
    id: loginUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.status(201).json({
    ststaus: "success",
    code: 201,
    message: "user logined",
    data: { email: loginUser.email, token },
  });
};
module.exports = login;
