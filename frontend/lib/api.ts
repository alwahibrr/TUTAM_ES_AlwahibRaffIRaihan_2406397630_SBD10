// ─── Base API Client ───────────────────────────────────────────────────────────
// Low coupling: all HTTP concerns live here; consumers never touch fetch directly.

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  token?: string;
}

export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly data?: unknown,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export async function request<T>(
  path: string,
  { method = 'GET', body, token }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data: unknown;
  try {
    const rawText = await response.text();
    try {
      data = JSON.parse(rawText);
    } catch {
      // If it's HTML or plain text error, log it securely to debug
      console.error('API Error Response:', rawText);
      data = null;
    }
  } catch {
    data = null;
  }

  if (!response.ok || (data && typeof data === 'object' && 'success' in data && data.success === false)) {
    const message =
      (data as { message?: string })?.message ?? response.statusText;
    throw new ApiClientError(response.status, message, data);
  }

  const payload = (data as { payload?: unknown })?.payload;

  return (payload !== undefined ? payload : data) as T;
}
