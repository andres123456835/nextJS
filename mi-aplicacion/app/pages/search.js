// pages/search.js
import { useState, useEffect } from 'react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Sustituir con la lógica para realizar la búsqueda
    // Por ejemplo, una solicitud GET al backend
    if (searchTerm) {
      setError('');
      setResults([]); // Actualizar con los resultados de la búsqueda
    }
  }, [searchTerm]);

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar comercios" />
      {error && <p>Error: {error}</p>}
      {/* Renderizar los resultados de búsqueda aquí */}
    </div>
  );
}
