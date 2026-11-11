import { API_ERROR_MESSAGES, API_URL } from './constants';
import type { ApiErrorBody } from './types';

// Error de tu API con su código de estado, para decidir qué hacer en la interfaz
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, options);
  } catch {
    throw new ApiError(API_ERROR_MESSAGES.NETWORK, 0);
  }

  if (!response.ok) {
    const body: ApiErrorBody = await response.json().catch(() => ({}));
    throw new ApiError(body.message ?? API_ERROR_MESSAGES.GENERIC, response.status);
  }

  return response.json();
}
