import { NextFunction, Request, Response } from 'express';
import Logging from '../library/logging';
import { getUserByAccessToken } from '../services/user.service';
import { merge } from 'lodash';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.sendStatus(403);
    }
    const user = getUserByAccessToken(token.replace('Bearer ', ''));
    if (!user) {
      return res.sendStatus(403);
    }
    merge(req, { currentUser: user });
    return next();
  } catch (error) {
    Logging.error(error);
  }
};
