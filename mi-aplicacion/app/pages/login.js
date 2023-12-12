// pages/login.js
import { useState } from 'react';
import Router from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sustituir con la lógica de autenticación adecuada
      // Por ejemplo, una solicitud POST al backend
      setError('');
      Router.push('/dashboard'); // Redirigir al dashboard después del login
    } catch (error) {
      setError('Error de inicio de sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>Error: {error}</p>}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
