import { Schema, Types, model } from 'mongoose';
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

// De API Ninjas solo se guarda lo que identifica la moto (marca, modelo y año);
// el resto son datos propios de cada persona
interface IGarageItem {
  make: string;
  model: string;
  year: number;
  rating: number;
  review: string;
  status: (typeof GARAGE_STATUSES)[number];
  owner: Types.ObjectId;
  createdAt: Date;
}

const garageItemSchema = new Schema<IGarageItem>({
  make: {
    type: String,
    required: [true, MESSAGES.GARAGE_REQUIRED],
    trim: true,
    maxlength: [MAKE_MAX_LENGTH, MESSAGES.GARAGE_TEXT_LENGTH],
  },
  model: {
    type: String,
    required: [true, MESSAGES.GARAGE_REQUIRED],
    trim: true,
    maxlength: [MODEL_MAX_LENGTH, MESSAGES.GARAGE_TEXT_LENGTH],
  },
  year: {
    type: Number,
    required: [true, MESSAGES.GARAGE_REQUIRED],
    min: [YEAR_MIN, MESSAGES.GARAGE_INVALID_YEAR],
    max: [YEAR_MAX, MESSAGES.GARAGE_INVALID_YEAR],
  },
  rating: {
    type: Number,
    required: [true, MESSAGES.GARAGE_REQUIRED],
    min: [RATING_MIN, MESSAGES.GARAGE_INVALID_RATING],
    max: [RATING_MAX, MESSAGES.GARAGE_INVALID_RATING],
  },
  review: {
    type: String,
    trim: true,
    maxlength: [REVIEW_MAX_LENGTH, MESSAGES.GARAGE_REVIEW_LENGTH],
    default: '',
  },
  status: {
    type: String,
    required: [true, MESSAGES.GARAGE_REQUIRED],
    enum: { values: GARAGE_STATUSES, message: MESSAGES.GARAGE_INVALID_STATUS },
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Una misma moto solo puede estar una vez en el garage de cada persona
garageItemSchema.index({ owner: 1, make: 1, model: 1, year: 1 }, { unique: true });

export default model<IGarageItem>('GarageItem', garageItemSchema);
