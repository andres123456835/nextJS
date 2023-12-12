// pages/register.js
import { useState } from 'react';
import Router from 'next/router';

export default function Register() {
  const [formData, setFormData] = useState({
    nombreComercio: '',
    direccion: '',
    email: '',
    password: '',
    // Añadir otros campos según sea necesario
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sustituir con la lógica de registro adecuada
      setError('');
      Router.push('/dashboard'); // Redirigir al dashboard después del registro
    } catch (error) {
      setError('Error en el registro');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>Error: {error}</p>}
      {/* Campos de formulario */}
      <button type="submit">Registrar</button>
    </form>
  );
}
