const { Schema, model } = require("mongoose");
const Joi = require("joi");
const catchErrors = require("../helpers/schemaValidationError");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", catchErrors);

const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({ favorite: Joi.boolean().required() });

const schemas = {
  addSchema,
  updateSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
