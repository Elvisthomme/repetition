import { Router } from 'express';
import { index, show, store, put, destroy } from '../controllers/user.controller';
import { Schema, ValidatorMiddleware } from '../middleware/validator.middleware';
import { isAuthenticated } from '../middleware';

const userRouter = Router();
const endPoint = 'users';

userRouter.get(endPoint, isAuthenticated, index);

userRouter.get(`${endPoint}/:id`, show);

userRouter.delete(`${endPoint}/:id`, destroy);

export default userRouter;
