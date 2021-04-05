import { Request, Response, NextFunction } from 'express';
import { isAfter, isBefore } from 'date-fns';
import dateConfig from '@config/dates';
import AppError from '@shared/errors/AppError';

export default function DateAuthorization(
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const now = new Date();
  console.info(dateConfig.beginDate);
  console.info(dataConfig.finalDate);
  if (isBefore(now, dateConfig.beginDate))
    throw new AppError('Subscription is not open yet');
  if (isAfter(now, dateConfig.finalDate))
    throw new AppError('Subscription is already closed');

  next();
}
