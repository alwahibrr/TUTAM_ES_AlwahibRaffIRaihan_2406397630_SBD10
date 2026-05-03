import { request } from './api';
import type { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: payload,
  });
}

export async function register(payload: RegisterPayload): Promise<{ id: number, email: string }> {
  return request<{ id: number, email: string }>('/user/register', {
    method: 'POST',
    body: payload,
  });
}

const TOKEN_KEY = 'sbd_token';

export function saveToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function clearToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
}
