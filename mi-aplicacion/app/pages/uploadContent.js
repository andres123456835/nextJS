// pages/uploadContent.js
import { useState } from 'react';

export default function UploadContent() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sustituir con la lógica para subir el archivo y la descripción
      setError('');
      // Acciones después de la subida exitosa
    } catch (error) {
      setError('Error al subir el contenido');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>Error: {error}</p>}
      <input type="file" onChange={handleFileChange} />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
      <button type="submit">Subir Contenido</button>
    </form>
  );
}
