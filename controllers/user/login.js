const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { schemaValidationError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw schemaValidationError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw schemaValidationError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw schemaValidationError(400, "Email not verify");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    ststaus: "OK",
    code: 200,
    message: "user logined",
    data: {
      token,
      message: "Verification email sent",
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};
module.exports = login;
