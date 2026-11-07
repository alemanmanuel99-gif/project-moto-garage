import { Schema, model } from 'mongoose';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../utils/constants.js';

interface IUser {
  name: string;
  email: string;
  password: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: NAME_MIN_LENGTH,
    maxlength: NAME_MAX_LENGTH,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value: string) => emailRegex.test(value),
      message: 'El correo electrónico no es válido',
    },
  },
  password: {
    type: String,
    required: true,
    // El hash no se incluye en las consultas salvo que se pida con .select('+password')
    select: false,
  },
});

export default model<IUser>('User', userSchema);
