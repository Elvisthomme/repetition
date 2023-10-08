import { Request, Response } from 'express';

async function index(req: Request, res: Response) {
  try {
    const resources = 'fetch resources';
    return res.json({
      resources,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to read patient appointments',
    });
  }
}

async function show(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const record = '...';
    if (!record) {
      return res.status(404).json({ message: `No record with the id ${id}` });
    }
    return res.json(record);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to read', error: error });
  }
}

async function store(req: Request, res: Response) {
  try {
    const record = 'create record';
    return res.status(201).json(record);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to create appointment', error: error });
  }
}

async function put(req: Request, res: Response) {
  try {
    const { id } = req.params;
    let record = 'find record';
    if (!record) {
      return res.status(404).json({ message: `No record with the id ${id}` });
    }
    record = 'update record with' + { ...req.body };
    return res.json(record);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update appointment' });
  }
}

async function destroy(req: Request, res: Response) {
  try {
    const { id } = req.params;
    let record = 'find record';
    if (!record) {
      return res.status(404).json({ message: `No record with the id ${id}` });
    }
    record = 'delete record';
    return res.json(record);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update appointment' });
  }
}

export { index, store, show, put, destroy };
