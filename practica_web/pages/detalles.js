import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
export default function Detalle() {
   
    
    const [businesses, setBusinesses] = useState([]);

    
    let id = 0;
    

    useEffect(() => {
        id = localStorage.getItem('id');
        //console.log(id);
        fetch('/api/businesses')
            .then(response => response.json())
            .then(data => setBusinesses(data.filter(f=> f.id == id)))
            
          
    }, []);

   
   
    return (
        <div>
            <ul>
                {                    
                    businesses.map(business => (
                        <div>
                            <h1>NOMBRE: {business.name}</h1>
                            <h1>ID :{business.id}</h1>
                        </div>
                    ))
                }
            </ul>
        </div>
    );
}
