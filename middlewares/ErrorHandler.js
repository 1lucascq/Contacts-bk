const { StatusCodes } = require('http-status-codes');

module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    console.log('EH Joi')
    return res.status(StatusCodes.BAD_REQUEST).json({ error: { message: err.details[0].message } });
  }
  
  const status = +err.message.slice(0, 3);
  if (status > 100 && status < 600 ) {
    return res.status(+err.message.slice(0,3)).json({ message: err.message.slice(4) });
  }
  
  console.log('EH Generico')
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `${err.message} port é: ${process.env.PORT} e HOST é: ${process.env.HOST}` });
};