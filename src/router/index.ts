import { Express } from 'express';
import exampleRouter from './example.router';
import authRouter from './auth.router';
import userRouter from './user.router';

export default (app: Express) => {
  app.use(`/api/${process.env.VERSION}`, userRouter);
  app.use(`/api/${process.env.VERSION}`, exampleRouter);
  app.use(`/api/${process.env.VERSION}`, authRouter);
};
