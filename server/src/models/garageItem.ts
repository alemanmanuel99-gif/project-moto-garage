import { Schema, Types, model } from 'mongoose';
import {
  GARAGE_STATUSES,
  RATING_MAX,
  RATING_MIN,
  REVIEW_MAX_LENGTH,
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
  make: { type: String, required: true, trim: true, maxlength: 60 },
  model: { type: String, required: true, trim: true, maxlength: 100 },
  year: { type: Number, required: true, min: 1885, max: 2100 },
  rating: { type: Number, required: true, min: RATING_MIN, max: RATING_MAX },
  review: { type: String, trim: true, maxlength: REVIEW_MAX_LENGTH, default: '' },
  status: { type: String, required: true, enum: GARAGE_STATUSES },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Una misma moto solo puede estar una vez en el garage de cada persona
garageItemSchema.index({ owner: 1, make: 1, model: 1, year: 1 }, { unique: true });

export default model<IGarageItem>('GarageItem', garageItemSchema);
