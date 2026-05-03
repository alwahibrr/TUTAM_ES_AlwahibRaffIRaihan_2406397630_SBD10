import { request } from './api';

export interface Todo {
  id: number;
  user_id: number;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: string;
}

export function getTodos(token: string) {
  return request<Todo[]>('/todos', { token });
}

export function createTodo(token: string, payload: { title: string; description?: string }) {
  return request<Todo>('/todos', { method: 'POST', body: payload, token });
}

export function updateTodoStatus(token: string, id: number, is_completed: boolean) {
  return request<Todo>(`/todos/${id}`, { method: 'PUT', body: { is_completed }, token });
}

export function deleteTodo(token: string, id: number) {
  return request<Todo>(`/todos/${id}`, { method: 'DELETE', token });
}
