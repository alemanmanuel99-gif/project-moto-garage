import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/error-handler.js';
import router from './routes/index.js';
import { DEFAULT_CLIENT_ORIGIN, DEFAULT_PORT } from './utils/constants.js';
import { connectToDatabase } from './utils/db.js';

const app = express();
const PORT = process.env.PORT || DEFAULT_PORT;

// Vercel pone un proxy delante: confiamos solo en ese primero
app.set('trust proxy', 1);

app.use(cors({ origin: process.env.CLIENT_ORIGIN || DEFAULT_CLIENT_ORIGIN }));
app.use(express.json());

// Ruta de estado: responde siempre igual, sin base de datos ni token
app.get('/health', (_req, res) => {
  res.send({ status: 'ok' });
});

// El resto de las rutas usa la base: esperan a que la conexión esté lista
app.use(async (_req, _res, next) => {
  await connectToDatabase();
  next();
});

app.use(router);
app.use(errorHandler);

connectToDatabase().catch((err) => console.error('Error al conectar a MongoDB', err));

app.listen(PORT, () => {
  console.warn(`Servidor ejecutándose en el puerto ${PORT}`);
});

export default app;
