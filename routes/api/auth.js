const express = require("express");

const router = express.Router();
const { schemas } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");

const {
  validation,
  ctrlWrapper /* isValidId */,
} = require("../../middlewares");

router.post(
  "/register",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.login)
);

module.exports = router;
