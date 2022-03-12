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
  password: Joi.string().min(8),
  email: Joi.string().email().lowercase().trim(),
});
