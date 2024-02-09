import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';

async function store(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name
  });
  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((error) => res.status(500).json(error));
}
async function show(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.id;
  return User.findById(userId)
    .then((user) =>
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            message: 'Not found ' + userId
          })
    )
    .catch((error) => res.status(500).json(error));
}

async function index(req: Request, res: Response, next: NextFunction) {
  return User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json(error));
}

async function put(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.id;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);
        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json(error));
      } else {
        return res.status(404).json({
          message: 'Not found'
        });
      }
    })
    .catch((error) => res.status(500).json(error));
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.id;
  return User.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? res.status(200).json({ message: 'user deleted' })
        : res.status(404).json({
            message: 'Not found'
          })
    )
    .catch((error) => res.status(500).json(error));
}

export { index, store, show, put, destroy };
