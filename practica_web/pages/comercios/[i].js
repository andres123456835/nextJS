// pages/comercios/[id].js
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const BusinessDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [business, setBusiness] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        console.log("id:",id)
        if (id) {
            console.log("id:",id)
        }    
    }, [id]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!business && !isLoading) {
    return <div>Negocio no encontrado o ID no proporcionado.</div>;
}

    return (
        <div>
            <h1>{business.name}</h1>
            {/* Aquí puedes mostrar más detalles del negocio */}
            <p>CIF: {business.CIF}</p>
            <p>Dirección: {business.direccion}</p>
            <p>Email: {business.email}</p>
            <p>Teléfono: {business.telefono}</p>
            {/* ... más detalles ... */}
        </div>
    );
};

export default BusinessDetails;
