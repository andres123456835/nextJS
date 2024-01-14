import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
const jws = require('jws');

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);
    const router = useRouter();

    const [eresadmin, seteresadmin] = useState("");
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = jws.decode(token);
        const userRole = decoded.payload.role;
        seteresadmin(userRole)

        fetch('/api/businesses')
            .then(response => response.json())
            .then(data => setBusinesses(data));
    }, []);

    function ComerciosDetalles(id) {
        //console.log(id);
        localStorage.setItem('id', id);
        router.push('/detalles');
    }

    function ComerciosBorrar(id) {
        //console.log(id);
        const fil = businesses.filter(f => f.id != id)
        setBusinesses(fil)

        fetch('/api/businesses?id='+id)
            .then(response => response.json())
            .then(data => setBusinesses(data));
        
    }
  
    return (
            <ul>
                {businesses.map(business => (
                    <div>
                        <button onClick={() => ComerciosDetalles(business.id)}>{business.name}</button>
                        {eresadmin == "admin" ? (
                                        <div><button onClick={() => ComerciosBorrar(business.id)}>Eliminar</button><br/></div>
                                      ) : (
                                            <h1></h1>
                                      )
                        }
                       
                    </div>
                    
                ))}
            </ul>
        );
};
    
export default BusinessList;