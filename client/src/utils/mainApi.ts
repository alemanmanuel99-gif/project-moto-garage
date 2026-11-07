import { request } from './request';
import { getToken } from './token';
import type { GarageItem, NewGarageItem, User } from './types';

// El token se lee en el momento de cada petición, no una sola vez al cargar el módulo
function getHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken() ?? ''}`,
  };
}

export function getCurrentUser(): Promise<User> {
  return request<User>('/users/me', { headers: getHeaders() });
}

export function getGarageItems(): Promise<GarageItem[]> {
  return request<GarageItem[]>('/garage', { headers: getHeaders() });
}

export function addGarageItem(item: NewGarageItem): Promise<GarageItem> {
  return request<GarageItem>('/garage', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(item),
  });
}

export function deleteGarageItem(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/garage/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
}
