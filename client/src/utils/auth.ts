import { request } from './request';
import type { LoginData, LoginResponse, RegisterData, User } from './types';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export function register(data: RegisterData): Promise<User> {
  return request<User>('/signup', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  });
}

export function login(data: LoginData): Promise<LoginResponse> {
  return request<LoginResponse>('/signin', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  });
}
