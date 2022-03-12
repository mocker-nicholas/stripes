import { joiUserSchema } from "../schemas/userschema.js";

export const validateUser = (req, res, next) => {
  const { error } = joiUserSchema.validate(req.body);
  if (error) {
    req.flash("error", `${error.message}`);
    console.log(req);
    return res.redirect(`${req.originalUrl}`);
  }
  return next();
};
