const express = require("express");

const router = express.Router();
const { schemas } = require("../../models/user");
const { user: ctrl } = require("../../controllers");

const {
  validation,
  authenticate,
  ctrlWrapper,
  upload /* isValidId */,
} = require("../../middlewares");

// register
router.post(
  "/signup",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

// singin
router.post(
  "/login",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.login)
);

// current
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

// update
router.patch(
  "/",
  authenticate,
  validation(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

// avatar
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
