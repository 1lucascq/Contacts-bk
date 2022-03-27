import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export default function ErrorHandler(err: Joi.Err | any, req: Request, res: Response, _next: NextFunction) {
  if (err.isJoi) {
    console.log(req.body)
    return res.status(StatusCodes.BAD_REQUEST).json({ message: { message: err.details[0].message } });
  }
  
  const status = +err.message.slice(0, 3);
  if (status > 100 && status < 600 ) {
    return res.status(+err.message.slice(0,3)).json({ message: err.message.slice(4) });
  }
  
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message
  });
};