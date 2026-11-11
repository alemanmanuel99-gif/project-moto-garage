import mongoose from 'mongoose';
import { MONGO_MAX_POOL_SIZE } from './constants.js';

// En Vercel la función se congela entre peticiones: guardamos la conexión en curso
// y la reintentamos si el intento anterior falló
let dbConnection: Promise<typeof mongoose> | null = null;

export const connectToDatabase = () => {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose);
  }
  if (!dbConnection) {
    dbConnection = mongoose
      .connect(process.env.MONGO_URI!, { maxPoolSize: MONGO_MAX_POOL_SIZE })
      .then((connection) => {
        console.warn('Conectado a MongoDB');
        return connection;
      })
      .catch((err) => {
        dbConnection = null;
        throw err;
      });
  }
  return dbConnection;
};
