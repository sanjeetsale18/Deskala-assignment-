const Joi = require("joi");

const userValidationSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required(),
  phoneNo: Joi.number().required(),
});

const loginValidationSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required(),
});

const validateSchema = (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

const loginValidate = (req, res, next) => {
  const { error } = loginValidationSchema.validate(req.body);
  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

module.exports = {
  loginValidate,
  validateSchema,
};
