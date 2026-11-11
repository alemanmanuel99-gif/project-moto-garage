import { rateLimit } from 'express-rate-limit';
import { MESSAGES, SIGNIN_LIMIT, SIGNUP_LIMIT } from '../utils/constants.js';

export const signinLimiter = rateLimit({
  windowMs: SIGNIN_LIMIT.WINDOW_MS,
  limit: SIGNIN_LIMIT.MAX,
  message: { message: MESSAGES.SIGNIN_TOO_MANY },
});

export const signupLimiter = rateLimit({
  windowMs: SIGNUP_LIMIT.WINDOW_MS,
  limit: SIGNUP_LIMIT.MAX,
  message: { message: MESSAGES.SIGNUP_TOO_MANY },
});
