import { useState } from 'react';
import { postLogin } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { token, user } = await postLogin(email, password);
      // Para simplicidad: guardar token en localStorage (no recomendado para producción)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/lots');
    } catch (err) {
      alert('Credenciales incorrectas');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Contraseña" />
      <button type="submit">Entrar</button>
    </form>
  );
}