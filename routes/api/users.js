const express = require("express");

const router = express.Router();
const { schemas } = require("../../models/user");
const { user: ctrl } = require("../../controllers");

const {
  validation,
  authenticate,
  ctrlWrapper,
  upload,
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

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

// verify
router.post(
  "/verify",
  validation(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

// current
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

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
