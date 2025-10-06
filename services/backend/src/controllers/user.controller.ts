import { Request, Response, NextFunction } from 'express';

import { prisma } from '../utils/db.util';
import { UserSchema } from '../models/user.model';
import { CuidSchema } from '../models/id.model';

// @desc    API Create User Handler
// route    POST /v2/user/
// @access  Public

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;

    UserSchema.safeParse(body);

    const result = await prisma.user.create({
      data: {
        email: body.email,
        givenName: body.givenName,
        familyName: body.familyName,
      },
    });

    res.status(201).json({
      message: 'User created successfully',
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    API Get User Handler
// route    POST /v2/user/:id
// @access  Private

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    if (!id) throw new Error('No User ID');
    CuidSchema.safeParse(id);

    const result = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      res.status(404).json({
        message: 'User Not Found',
        payload: null,
      });
      return;
    }

    res.status(201).json({
      message: 'User created successfully',
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    API Update User Handler
// route    POST /v2/user/:id
// @access  Private

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const body = req.body;

    if (!id) throw new Error('No User ID');
    CuidSchema.safeParse(id);
    UserSchema.safeParse(body);

    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });

    if (!result) {
      res.status(404).json({
        message: 'User Not Found',
        payload: null,
      });
      return;
    }

    res.status(200).json({
      message: 'User updated successfully',
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    API Delete User Handler
// route    POST /v2/user/:id
// @access  Private

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    if (!id) throw new Error('No User ID');
    CuidSchema.safeParse(id);

    const result = await prisma.user.delete({
      where: {
        id,
      },
    });

    if (!result) {
      res.status(404).json({
        message: 'User Not Found',
        payload: null,
      });
      return;
    }

    res.status(200).json({
      message: 'User deleted successfully',
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};
