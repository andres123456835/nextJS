import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
const jws = require('jws');

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);
    const router = useRouter();
    const [eresadmin, seteresadmin] = useState("");
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jws.decode(token);
            const userRole = decoded.payload.role;
            seteresadmin(userRole)

            fetch('/api/businesses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => setBusinesses(data))
            .catch(error => {
                console.error('Error al cargar comercios:', error);
                // Manejar el error adecuadamente
            });
        }
    }, []);

    function ComerciosDetalles(id) {
        //console.log(id);
        localStorage.setItem('id', id);
        router.push('/detalles');
    }

    function ComerciosBorrar(id) {
        console.log('Eliminando comercio con ID:', id);
        fetch('/api/businesses/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ id: id }) // Envía el ID en el cuerpo de la solicitud
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el comercio');
            }
            // Actualiza el estado local para reflejar la eliminación
            setBusinesses(businesses.filter(business => business.id !== id));
        })
        .catch(error => {
            console.error('Error al eliminar comercio:', error);
            // Manejar el error adecuadamente
        });
    }
  
    return (
        <ul>
            {businesses.map(business => (
                <div key={business.id}> {/* Agrega una clave única */}
                    <button onClick={() => ComerciosDetalles(business.id)}>{business.name}</button>
                    {eresadmin === "admin" && (
                        <div>
                            <button onClick={() => ComerciosBorrar(business.id)}>Eliminar</button><br/>
                        </div>
                    )}
                </div>
            ))}
        </ul>
    );
};
    
export default BusinessList;