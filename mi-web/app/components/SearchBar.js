// Importa dynamic de Next.js
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Define el componente de búsqueda normalmente.
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="mt-10 mb-4">
      <form onSubmit={handleSubmit} className="flex justify-center">
        <input
          type="text"
          placeholder="Buscar comercios por ciudad o actividad..."
          className="p-2 w-full max-w-md rounded-l-md border-2 border-r-0 border-gray-300 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

// Exporta el componente envuelto por dynamic y configura { ssr: false } para deshabilitar el Server-Side Rendering para este componente.
export default dynamic(() => Promise.resolve(SearchBar), {
  ssr: false,
});
