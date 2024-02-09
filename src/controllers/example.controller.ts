import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Example from '../models/example';

async function store(req: Request, res: Response, next: NextFunction) {
  const { name, author } = req.body;
  const example = new Example({
    _id: new mongoose.Types.ObjectId(),
    name, author
  });
  return example
    .save()
    .then((example) => res.status(201).json({ example }))
    .catch((error) => res.status(500).json(error));
}
async function show(req: Request, res: Response, next: NextFunction) {
  const exampleId = req.params.id;
  return Example.findById(exampleId).populate('author')
    .then((example) =>
      example
        ? res.status(200).json(example)
        : res.status(404).json({
            message: 'Not found ' + exampleId
          })
    )
    .catch((error) => res.status(500).json(error));
}

async function index(req: Request, res: Response, next: NextFunction) {
  return Example.find().populate('author')
    .then((examples) => res.status(200).json(examples))
    .catch((error) => res.status(500).json(error));
}

async function put(req: Request, res: Response, next: NextFunction) {
  const exampleId = req.params.id;
  return Example.findById(exampleId).populate('author')
    .then((example) => {
      if (example) {
        example.set(req.body);
        return example
          .save()
          .then((example) => res.status(201).json({ example }))
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
  const exampleId = req.params.id;
  return Example.findByIdAndDelete(exampleId)
    .then((example) =>
      example
        ? res.status(200).json({ message: 'example deleted' })
        : res.status(404).json({
            message: 'Not found'
          })
    )
    .catch((error) => res.status(500).json(error));
}

export { index, store, show, put, destroy };
