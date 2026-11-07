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

// Rutas protegidas: exigen un JWT válido
router.use('/users', auth, usersRouter);
router.use('/garage', auth, garageRouter);

// Cualquier otra ruta responde 404, con o sin token

router.use(() => {
  throw httpError(404, MESSAGES.ROUTE_NOT_FOUND);
});

export default router;
