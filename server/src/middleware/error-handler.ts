import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { MESSAGES } from '../utils/constants.js';

type AppError = Error & { statusCode?: number; type?: string };

// Manejador central: el cliente recibe solo un mensaje claro, nunca la traza ni el error de la base
export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const [firstError] = Object.values(err.errors);
    res.status(400).send({ message: firstError?.message ?? MESSAGES.SERVER_ERROR });
    return;
  }

  if (err instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: MESSAGES.INVALID_ID });
    return;
  }

  if (err.type === 'entity.parse.failed') {
    res.status(400).send({ message: MESSAGES.INVALID_JSON });
    return;
  }

  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }

  console.error(err);
  res.status(500).send({ message: MESSAGES.SERVER_ERROR });
};
