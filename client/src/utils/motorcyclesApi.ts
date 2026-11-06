import { ERROR_MESSAGES, MOTORCYCLES_API_URL } from './constants';
import type { Motorcycle, SearchParams } from './types';

const API_KEY = import.meta.env.VITE_API_NINJAS_KEY ?? '';

function getErrorMessage(status: number): string {
  if (status === 429) return ERROR_MESSAGES.RATE_LIMIT;
  if (status === 401 || status === 403) return ERROR_MESSAGES.INVALID_KEY;
  return ERROR_MESSAGES.GENERIC;
}

// La API no tiene identificador: marca, modelo y año juntos identifican cada moto
export function getMotorcycleKey(motorcycle: Motorcycle): string {
  return `${motorcycle.make}-${motorcycle.model}-${motorcycle.year}`.toLowerCase();
}

function removeDuplicates(motorcycles: Motorcycle[]): Motorcycle[] {
  const seen = new Set<string>();
  return motorcycles.filter((motorcycle) => {
    const key = getMotorcycleKey(motorcycle);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function searchMotorcycles({ field, query }: SearchParams): Promise<Motorcycle[]> {
  const url = `${MOTORCYCLES_API_URL}?${new URLSearchParams({ [field]: query.trim() })}`;

  let response: Response;
  try {
    response = await fetch(url, { headers: { 'X-Api-Key': API_KEY } });
  } catch {
    throw new Error(ERROR_MESSAGES.NETWORK);
  }

  if (!response.ok) {
    throw new Error(getErrorMessage(response.status));
  }

  const motorcycles: Motorcycle[] = await response.json();
  return removeDuplicates(motorcycles);
}
