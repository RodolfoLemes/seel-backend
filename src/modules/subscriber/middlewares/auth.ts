import { Request, Response, NextFunction } from 'express';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

export default function auth(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const secret = req.headers.authorization;

  if (secret !== authConfig.secret) throw new AppError('Forbidden', 403);

  next();
}
