import { Request, Response, NextFunction } from 'express';

import { prisma } from '../utils/db.util';
import { EntrySchema } from '../models/entry.model';
import { CuidSchema } from '../models/id.model';

// @desc    API Create Entry Handler
// route    POST /v2/entry/
// @access  Public

export const createEntry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;

    EntrySchema.safeParse(body);

    const result = await prisma.entry.create({
      data: {
        authorId: body.id,
        title: body.title,
        body: body.body,
      },
    });

    res.status(201).json({
      message: 'Entry created successfully',
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    API Get Entry Handler
// route    POST /v2/entry/:id
// @access  Private

export const getEntry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    if (!id) throw new Error('No Entry ID');
    CuidSchema.safeParse(id);

    const result = await prisma.entry.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      res.status(404).json({
        message: 'Entry Not Found',
        payload: null,
      });
      return;
    }

    res.status(201).json({
      message: 'Entry created successfully',
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    API Update Entry Handler
// route    POST /v2/entry/:id
// @access  Private

export const updateEntry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const body = req.body;

    if (!id) throw new Error('No Entry ID');
    CuidSchema.safeParse(id);
    EntrySchema.safeParse(body);

    const result = await prisma.entry.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });

    if (!result) {
      res.status(404).json({
        message: 'Entry Not Found',
        payload: null,
      });
      return;
    }

    res.status(200).json({
      message: 'Entry updated successfully',
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    API Delete Entry Handler
// route    POST /v2/entry/:id
// @access  Private

export const deleteEntry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    if (!id) throw new Error('No Entry ID');
    CuidSchema.safeParse(id);

    const result = await prisma.entry.delete({
      where: {
        id,
      },
    });

    if (!result) {
      res.status(404).json({
        message: 'Entry Not Found',
        payload: null,
      });
      return;
    }

    res.status(200).json({
      message: 'Entry deleted successfully',
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};
