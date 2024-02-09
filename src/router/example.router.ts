import { Router } from 'express';
import { show, store, put, destroy } from '../controllers/example.controller';
import { Schema, ValidatorMiddleware } from '../middleware/validator.middleware';
import { isAuthenticated } from '../middleware';
import { index } from '../controllers/user.controller';

const exampleRouter = Router();
const endPoint = '/examples';

exampleRouter.get(endPoint, isAuthenticated, index);

exampleRouter.get(`${endPoint}/:id`, show);

exampleRouter.post(endPoint, ValidatorMiddleware(Schema.example.post), store);

exampleRouter.put(`${endPoint}/:id`, ValidatorMiddleware(Schema.example.put), put);

exampleRouter.delete(`${endPoint}/:id`, destroy);

export default exampleRouter;
