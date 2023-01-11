// const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

// const { SECRET_KEY } = process.env;

const { schemaValidationError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(schemaValidationError(401));
  }

  try {
    // const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ token });
    if (!user || !user.token || token !== String(user.token)) {
      next(schemaValidationError(401, "Not authorized"));
    }

    req.user = user;

    next();
  } catch {
    next(schemaValidationError(401, "Not authorized"));
  }
};

module.exports = authenticate;
