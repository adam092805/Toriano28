const BASE_URL = 'https://dummyjson.com';

export async function loginUser(username: string, password: string): Promise<any> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });

  if (!response.ok) {
    throw new Error('Login failed. Check your username and password.');
  }

  return await response.json();
}

export async function getCurrentUser(token: string): Promise<any> {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Session expired or invalid token.');
  }

  return await response.json();
}