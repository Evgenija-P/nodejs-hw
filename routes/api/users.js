const express = require("express");

const router = express.Router();
const { schemas } = require("../../models/user");
const { user: ctrl } = require("../../controllers");

const {
  validation,
  ctrlWrapper /* isValidId */,
} = require("../../middlewares");

router.post(
  "/signup",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.login)
);

module.exports = router;
