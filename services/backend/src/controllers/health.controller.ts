import { Request, Response, NextFunction } from 'express';

// @desc    API Health Handler
// route    GET /v2/health
// @access  Public

const getHealthHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(200).json({ message: 'Success' });
};

export default getHealthHandler;
