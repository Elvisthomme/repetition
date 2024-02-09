import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Logging from '../library/logging';
import { IUser } from '../models/user';
import { Example } from 'swagger-jsdoc';

export const ValidatorMiddleware = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      Logging.error(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schema = {
  user: {
    store: Joi.object<IUser>({
      name: Joi.string().required()
    }),
    put: Joi.object<IUser>({
      name: Joi.string().required()
    })
  },
  example: {
    post: Joi.object<Example>({
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      name: Joi.string().required()
    }),
    put: Joi.object<Example>({
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      name: Joi.string().required()
    })
  }
};
