import { joiUserSchema } from "../schemas/userschema.js";

export const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((e) => next(e));
  };
};

export const validateUser = (req, res, next) => {
  const { error } = joiUserSchema.validate(req.body);
  if (error) {
    req.flash("error", `${error.message}`);
    return res.redirect(`${req.originalUrl}`);
  }
  return next();
};
