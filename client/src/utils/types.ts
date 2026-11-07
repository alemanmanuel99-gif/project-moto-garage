// Moto tal como la devuelve API Ninjas: todos los valores llegan como texto
// y, salvo marca, modelo y año, cualquiera puede faltar
export interface Motorcycle {
  make: string;
  model: string;
  year: string;
  type?: string;
  displacement?: string;
  engine?: string;
  power?: string;
  torque?: string;
  top_speed?: string;
  gearbox?: string;
  cooling?: string;
  total_weight?: string;
  dry_weight?: string;
  seat_height?: string;
  fuel_capacity?: string;
}

export type SearchField = 'make' | 'model';

export interface SearchParams {
  field: SearchField;
  query: string;
}

export type SearchStatus = 'idle' | 'loading' | 'success' | 'error';

export interface Spec {
  label: string;
  value: string;
}

// --- Tu API (Moto Garage) ---

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export type GarageStatus = 'want' | 'tried' | 'own';

export interface GarageItem {
  _id: string;
  make: string;
  model: string;
  year: number;
  rating: number;
  review: string;
  status: GarageStatus;
  owner: string;
  createdAt: string;
}

export interface NewGarageItem {
  make: string;
  model: string;
  year: string;
  rating: number;
  review: string;
  status: GarageStatus;
}

export interface ApiErrorBody {
  message?: string;
}

export type ModalName = 'signin' | 'signup' | 'save' | null;

export interface Notification {
  text: string;
  isError: boolean;
}
