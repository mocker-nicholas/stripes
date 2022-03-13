import { joiUserSchema } from "../schemas/joischema.js";

export const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((e) => next(e));
  };
};

export const validateUser = (req, res, next) => {
  const { username, email } = req.session.user;
  const data = {
    username: username,
    email: email,
    billaddress: {
      street: req.body.billstreet,
      street2: req.body.billstreet2,
      country: req.body.billcountry,
      city: req.body.billcity,
      state: req.body.billstate,
      postal: req.body.billpostal,
    },
    shipaddress: {
      street: req.body.shipstreet,
      street2: req.body.shipstreet2,
      country: req.body.shipcountry,
      city: req.body.shipcity,
      state: req.body.shipstate,
      postal: req.body.shippostal,
    },
  };
  console.log(data);
  const { error } = joiUserSchema.validate(data);
  console.log(error);
  if (error) {
    req.flash("error", `${error.message}`);
    return res.redirect(`${req.originalUrl}`);
  }
  return next();
};
