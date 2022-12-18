const express = require("express");

const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateSchema),
  ctrlWrapper(ctrl.updateContactFavorite)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
