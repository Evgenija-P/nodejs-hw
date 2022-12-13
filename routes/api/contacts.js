const express = require("express");
const createError = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactsMethods = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await contactsMethods.listContacts();
    res.json({
      ststaus: "success",
      code: 200,
      message: "template message",
      data: { contactsList },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactFind = await contactsMethods.getContactById(contactId);
    if (!contactFind) {
      throw createError(404, `Contact with id = ${contactId} not found`);
    }
    res.json({
      ststaus: "success",
      code: 200,
      message: "contact found",
      data: { contactFind },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const contactsAdd = await contactsMethods.addContact(req.body);
    res.status(201).json({
      ststaus: "success",
      code: 201,
      message: "contact was added",
      data: { contactsAdd },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contactsMethods.removeContact(contactId);
    if (!deleteContact) {
      throw createError(404, `Contact with id = ${contactId} not found`);
    }
    res.json({
      ststaus: "success",
      code: 200,
      message: "contact deleted",
      data: { deleteContact },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const { contactId } = req.params;
    const contactUpdate = await contactsMethods.updateContact(
      contactId,
      req.body
    );
    if (!contactUpdate) {
      throw createError(404, `Contact with id = ${contactId} not found`);
    }
    res.json({
      ststaus: "success",
      code: 200,
      message: "contact updated",
      data: { contactUpdate },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
