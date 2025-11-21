const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function postLogin(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    // credentials: 'include' // si usas cookies httpOnly
  });
  if (!res.ok) throw new Error('Login falló');
  return res.json(); // { token, user }
}

export async function fetchLots(token) {
  const res = await fetch(`${API_URL}/lots`, {
    method: 'GET',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error('Error al obtener lotes');
  return res.json();
}