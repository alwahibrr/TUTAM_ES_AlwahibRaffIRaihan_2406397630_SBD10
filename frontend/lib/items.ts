import { request } from './api';

export interface Item {
  id: number;
  name: string;
  price: number;
  stock: number;
  created_at: string;
}

export async function getItems(token?: string): Promise<Item[]> {
  return request<Item[]>('/items', { token });
}
