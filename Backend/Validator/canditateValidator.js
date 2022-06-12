const Joi = require("joi");

const canditateschema = Joi.object().keys({
  name: Joi.string().max(50),
  address: Joi.string().max(125),
  dob: Joi.date(),
  state: Joi.string(),
  age: Joi.number().max(100).min(0),
  pincode: Joi.number().integer(),
});

const canditateValidate = (req, res, next) => {
  const { error } = canditateschema.validate(req.body);
  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

module.exports = {
  canditateValidate,
};
