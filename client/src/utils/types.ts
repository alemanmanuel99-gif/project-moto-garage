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
