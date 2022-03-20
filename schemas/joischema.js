import BaseJoi from "joi";
import sanitizeHTML from "sanitize-html";

//// exscape html on strings /////
const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHTML(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

export const joiUserSchema = Joi.object({
  username: Joi.string()
    .required()
    .min(9)
    .max(16)
    .lowercase()
    .trim()
    .escapeHTML(),
  password: Joi.string().min(8).escapeHTML(),
  email: Joi.string().email().lowercase().trim().escapeHTML(),
  billaddress: Joi.object({
    street: Joi.string().min(0).max(30).trim().escapeHTML(),
    street2: Joi.string().min(0).max(20).trim().escapeHTML(),
    city: Joi.string().min(0).max(20).trim(),
    country: Joi.string().min(0).max(4).uppercase().trim().escapeHTML(),
    state: Joi.string().min(0).max(2).uppercase().trim().escapeHTML(),
    postal: Joi.string().min(0).max(9).trim().escapeHTML(),
  }),
  shipaddress: Joi.object({
    street: Joi.string().min(0).max(30).trim().escapeHTML(),
    street2: Joi.string().min(0).max(20).trim().escapeHTML(),
    city: Joi.string().min(0).max(20).trim().escapeHTML(),
    country: Joi.string().min(0).max(4).uppercase().trim().escapeHTML(),
    state: Joi.string().min(0).max(2).uppercase().trim().escapeHTML(),
    postal: Joi.string().min(0).max(9).trim().escapeHTML(),
  }),
});

export const joiEmailFormSchema = Joi.object({
  firstname: Joi.string().min(0).max(20).trim().escapeHTML(),
  lastname: Joi.string().min(0).max(20).trim().escapeHTML(),
  email: Joi.string().email().required().max(50).trim().escapeHTML(),
});

export const joiProductSchema = Joi.object({
  name: Joi.string().required().max(100).trim(),
  imgurl: Joi.string().required().max(255).trim(),
  price: Joi.number().greater(0).less(999).positive(),
  category: Joi.string().required().min(5).max(9).trim(),
  description: Joi.string().trim().max(255),
  smallinstock: Joi.number().required().greater(-1).less(999),
  mediuminstock: Joi.number().required().greater(-1).less(999),
  largeinstock: Joi.number().required().greater(-1).less(999),
  featured: Joi.boolean().required(),
});
