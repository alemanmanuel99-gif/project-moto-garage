import { Router } from 'express';
import { createUser, login } from '../controllers/users.js';
import { signinLimiter, signupLimiter } from '../middleware/limiter.js';

const authRouter = Router();

authRouter.post('/signup', signupLimiter, createUser);
authRouter.post('/signin', signinLimiter, login);

export { authRouter };
