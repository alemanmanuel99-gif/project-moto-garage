import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import GarageItem from '../models/garageItem.js';
import {
  GARAGE_STATUSES,
  MAKE_MAX_LENGTH,
  MESSAGES,
  MODEL_MAX_LENGTH,
  RATING_MAX,
  RATING_MIN,
  REVIEW_MAX_LENGTH,
  YEAR_MAX,
  YEAR_MIN,
} from '../utils/constants.js';
import { httpError } from '../utils/http-error.js';

const isNonEmptyText = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const getGarageItems = async (req: Request, res: Response) => {
  const items = await GarageItem.find({ owner: req.user?._id }).sort({ createdAt: -1 });
  res.send(items);
};

export const createGarageItem = async (req: Request, res: Response) => {
  const { make, model, year, rating, review = '', status } = req.body ?? {};

  if (!isNonEmptyText(make) || !isNonEmptyText(model) || !year || !rating || !status) {
    throw httpError(400, MESSAGES.GARAGE_REQUIRED);
  }

  if (make.trim().length > MAKE_MAX_LENGTH || model.trim().length > MODEL_MAX_LENGTH) {
    throw httpError(400, MESSAGES.GARAGE_TEXT_LENGTH);
  }

  const yearNumber = Number(year);
  if (!Number.isInteger(yearNumber) || yearNumber < YEAR_MIN || yearNumber > YEAR_MAX) {
    throw httpError(400, MESSAGES.GARAGE_INVALID_YEAR);
  }
  if (!Number.isInteger(rating) || rating < RATING_MIN || rating > RATING_MAX) {
    throw httpError(400, MESSAGES.GARAGE_INVALID_RATING);
  }
  if (!GARAGE_STATUSES.includes(status)) {
    throw httpError(400, MESSAGES.GARAGE_INVALID_STATUS);
  }
  if (typeof review !== 'string' || review.trim().length > REVIEW_MAX_LENGTH) {
    throw httpError(400, MESSAGES.GARAGE_REVIEW_LENGTH);
  }

  try {
    const item = await GarageItem.create({
      make: make.trim(),
      model: model.trim(),
      year: yearNumber,
      rating,
      review: review.trim(),
      status,
      owner: req.user?._id,
    });
    res.status(201).send(item);
  } catch (err: unknown) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      throw httpError(409, MESSAGES.GARAGE_DUPLICATE);
    }
    throw err;
  }
};

export const deleteGarageItem = async (req: Request, res: Response) => {
  const item = await GarageItem.findById(req.params.id);

  // Primero si existe (404) y después de quién es (403)
  if (!item) {
    throw httpError(404, MESSAGES.GARAGE_NOT_FOUND);
  }
  if (item.owner.toString() !== req.user?._id) {
    throw httpError(403, MESSAGES.GARAGE_FORBIDDEN);
  }

  await item.deleteOne();
  res.send({ message: MESSAGES.GARAGE_DELETED });
};
