import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { MESSAGES } from '../utils/constants.js';
import { httpError } from '../utils/http-error.js';

export const auth = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(httpError(401, MESSAGES.AUTH_REQUIRED));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
    req.user = { _id: payload._id };
    next();
  } catch {
    next(httpError(401, MESSAGES.INVALID_TOKEN));
  }
};
