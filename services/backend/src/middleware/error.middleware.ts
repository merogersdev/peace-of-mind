import { Request, Response, NextFunction } from 'express';

import { ENV } from '../env';

import { z } from 'zod';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  const error = new Error(`Error: Endpoint Not Found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  let validationErrors = null;

  // Check for Zod-Specific Errors
  if (err instanceof z.ZodError) {
    statusCode = 400;
    message = 'Error: Invalid Request';
    validationErrors = err.issues;
  }

  res.status(statusCode).json({
    message,
    validationErrors,
    stack: ENV.BACKEND_ENV === 'PROD' ? null : err.stack,
  });

  next();
};
