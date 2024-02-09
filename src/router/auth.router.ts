import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
const authRouter = Router();
const endPoint = '/auth';

authRouter.post(`${endPoint}/register`, register, login);
authRouter.post(`${endPoint}/login`, login);

export default authRouter;
