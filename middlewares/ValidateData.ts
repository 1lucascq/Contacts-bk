const Joi = require('joi');

function ValidateData (req, _res, next) {
  const { name, email, image, phone } = req.body;
  
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().not().empty().required(),
    image: Joi.string().not().empty().required(),
  })
    .validate({ name, email, image })
  if(error) {
    return next(error)
  }
  next()
};

module.exports = { ValidateData }