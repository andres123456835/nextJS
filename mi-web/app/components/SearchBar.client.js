// app/components/SearchBar.client.js
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
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
}
