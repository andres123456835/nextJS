import React, { useState, useEffect } from 'react';
import Header from '/components/Header';
import Footer from '/components/Footer';
import BusinessList from '/components/BusinessList';

export default function Home() {
    //const [businesses, setBusinesses] = useState([]);

    /*useEffect(() => {
        // Aquí podrías hacer una llamada a una API para obtener los negocios
        // setBusinesses(response.data);
    }, []);*/
   
    return (
        <div>
            <Header />
            <main>
                <h1>Negocios Registrados</h1>
                <BusinessList />
            </main>
            <Footer />
        </div>
    );
}
