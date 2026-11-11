import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user.js';
import {
  JWT_EXPIRES_IN,
  MESSAGES,
  MIN_PASSWORD_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  SALT_ROUNDS,
} from '../utils/constants.js';
import { httpError } from '../utils/http-error.js';

type UserDoc = { _id: unknown; name: string; email: string };

// Solo los campos que el cliente necesita: nunca la contraseña ni su hash
const userResponse = (user: UserDoc) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
});

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body ?? {};

  if (!name || !email || !password) {
    throw httpError(400, MESSAGES.SIGNUP_REQUIRED);
  }
  if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    throw httpError(400, MESSAGES.CREDENTIALS_TEXT);
  }
  const trimmedName = name.trim();
  if (trimmedName.length < NAME_MIN_LENGTH || trimmedName.length > NAME_MAX_LENGTH) {
    throw httpError(400, MESSAGES.NAME_LENGTH);
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw httpError(400, MESSAGES.PASSWORD_LENGTH);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    const user = await User.create({ name: trimmedName, email, password: hashedPassword });
    res.status(201).send(userResponse(user));
  } catch (err: unknown) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      throw httpError(409, MESSAGES.EMAIL_TAKEN);
    }
    throw err;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    throw httpError(400, MESSAGES.SIGNIN_REQUIRED);
  }
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw httpError(400, MESSAGES.CREDENTIALS_TEXT);
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
  if (!user) {
    throw httpError(401, MESSAGES.INVALID_CREDENTIALS);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw httpError(401, MESSAGES.INVALID_CREDENTIALS);
  }

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET!, {
    expiresIn: JWT_EXPIRES_IN,
  });

  res.send({ token, user: userResponse(user) });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw httpError(404, MESSAGES.USER_NOT_FOUND);
  }
  res.send(userResponse(user));
};
