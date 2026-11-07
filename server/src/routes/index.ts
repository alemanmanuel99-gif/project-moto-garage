import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { MESSAGES } from '../utils/constants.js';
import { httpError } from '../utils/http-error.js';
import { authRouter } from './auth.js';
import { garageRouter } from './garage.js';
import { usersRouter } from './users.js';

const router = Router();

// Registro e inicio de sesión: abiertos, son los que entregan el token
router.use(authRouter);

// A partir de aquí, todas las rutas exigen un JWT válido
router.use(auth);
router.use('/users', usersRouter);
router.use('/garage', garageRouter);

router.use(() => {
  throw httpError(404, MESSAGES.ROUTE_NOT_FOUND);
});

export default router;
