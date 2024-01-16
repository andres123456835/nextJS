import React, { useState, useEffect } from 'react';
import Header from '/components/Header';
import Footer from '/components/Footer';
import BusinessList from '/components/BusinessList';

export default function Home() {
    const [cityInput, setCityInput] = useState('');
    const [filterCity, setFilterCity] = useState('');

    const handleFilter = () => {
        setFilterCity(cityInput);
    };
   
    return (
        <div>
            <Header />
            <main>
                <h1>Negocios Registrados</h1>
                <input
                    type="text"
                    placeholder="Buscar por ciudad"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                />
                <button onClick={handleFilter}>Filtrar</button>
                <BusinessList filterCity={filterCity} />
            </main>
            <Footer />
        </div>
    );
}
