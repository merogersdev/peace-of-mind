import { Request, Response, NextFunction } from 'express';
import log from '../utils/logger.util';

const loggerHandler = (req: Request, _res: Response, next: NextFunction) => {
  const { method, protocol, originalUrl } = req;
  const host = req.get('host');
  log.info(`${method} ${protocol}://${host}${originalUrl}`);
  next();
};

export default loggerHandler;
