const express = require("express");

// });
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const validate = validation(contactSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validate, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", validate, ctrlWrapper(ctrl.updateContact));

module.exports = router;
