import {
  joiUserSchema,
  joiEmailFormSchema,
  joiProductSchema,
} from "../schemas/joischema.js";

////////////////////////////////////////////////////
///////////////// Route Protection /////////////////
////////////////////////////////////////////////////

export const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "You must be signed in");
    return res.redirect("/user/login");
  }

  return next();
};

export const isAdmin = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "You must be signed in");
    return res.redirect("/user/login");
  }
  if (req.session.user.isadmin === false) {
    req.flash("error", "Current user does not have admin permission");
    return res.redirect("/user/login");
  }

  return next();
};

export const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((e) => next(e));
  };
};

///////////////////////////////////////////////////////
///////////////// User Joi middleware /////////////////
///////////////////////////////////////////////////////
export const validateEmailForm = (req, res, next) => {
  const { error } = joiEmailFormSchema.validate(req.body);
  if (error) {
    req.flash("error", `${error.message}`);
    return res.redirect("/#jump-to");
  }
  return next();
};

export const validateUser = (req, res, next) => {
  const { error } = joiUserSchema.validate(req.body);
  if (error) {
    req.flash("error", `${error.message}`);
    return res.redirect(`${req.originalUrl}`);
  }
  return next();
};

export const validateUpdate = (req, res, next) => {
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
  const { error } = joiUserSchema.validate(data);
  if (error) {
    req.flash("error", `${error.message}`);
    return res.redirect(`${req.originalUrl}`);
  }
  return next();
};

///////////////////////////////////////////////////////
///////////////// Product middleware //////////////////
///////////////////////////////////////////////////////
export const validateProduct = (req, res, next) => {
  const { error } = joiProductSchema.validate(req.body);
  if (error) {
    req.flash("error", `${error.message}`);
    return res.redirect(`${req.originalUrl}`);
  }
  return next();
};
