const express = require("express");
const { NotFound } = require("http-errors");
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
      throw NotFound(`Contact with id = ${contactId} not found`);
    }
    res.json({
      ststaus: "success",
      code: 200,
      message: "template message",
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
      error.status = 400;
      throw error;
    }
    const contactsAdd = await contactsMethods.addContact(req.body);
    res.status(201).json({
      ststaus: "success",
      code: 201,
      message: "template message",
      data: { contactsAdd },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    res.json({ message: "template message" });
  } catch {}
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const contactUpdate = await contactsMethods.updateContact(
      contactId,
      req.body
    );
    if (!contactUpdate) {
      throw NotFound(`Contact with id = ${contactId} not found`);
    }
    res.json({
      ststaus: "success",
      code: 200,
      message: "template message",
      data: { contactUpdate },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
