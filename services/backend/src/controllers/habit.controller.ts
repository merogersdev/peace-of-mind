import { Request, Response, NextFunction } from 'express';

import { prisma } from '../utils/db.util';
import { HabitSchema } from '../models/habit.model';
import { CuidSchema } from '../models/id.model';

// @desc    API Create Habit Handler
// route    POST /v2/habit/
// @access  Public

export const createHabit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;

    HabitSchema.safeParse(body);

    const result = await prisma.habit.create({
      data: {
        authorId: body.id,
        category: body.category,
      },
    });

    res.status(201).json({
      message: 'Habit created successfully',
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    API Get Entry Handler
// route    POST /v2/habit/:id
// @access  Private

export const getHabit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    if (!id) throw new Error('No Habit ID');
    CuidSchema.safeParse(id);

    const result = await prisma.habit.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      res.status(404).json({
        message: 'Habit Not Found',
        payload: null,
      });
      return;
    }

    res.status(200).json({
      message: 'Habit retreived successfully',
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    API Update Habit Handler
// route    POST /v2/habit/:id
// @access  Private

export const updateHabit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const body = req.body;

    if (!id) throw new Error('No Habit ID');
    CuidSchema.safeParse(id);
    HabitSchema.safeParse(body);

    const result = await prisma.habit.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });

    if (!result) {
      res.status(404).json({
        message: 'Habit Not Found',
        payload: null,
      });
      return;
    }

    res.status(200).json({
      message: 'Habit updated successfully',
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    API Delete Habit Handler
// route    POST /v2/habit/:id
// @access  Private

export const deleteHabit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    if (!id) throw new Error('No Habit ID');
    CuidSchema.safeParse(id);

    const result = await prisma.habit.delete({
      where: {
        id,
      },
    });

    if (!result) {
      res.status(404).json({
        message: 'Habit Not Found',
        payload: null,
      });
      return;
    }

    res.status(200).json({
      message: 'Habit deleted successfully',
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};
