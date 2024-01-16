import React, { useEffect, useState } from 'react';

export default function Detalle() {
    const [businesses, setBusinesses] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [users, setUsers] = useState([]);
    const [usersInSameCity, setUsersInSameCity] = useState([]);
    const [inputText, setInputText] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtener el token de localStorage
        if (token) {
            fetch('/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}` // Incluir el token en los encabezados
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => setUsers(data))
            .catch(error => console.error('Error al cargar usuarios:', error));
        }else{
            console.error('Token no proporcionado');
        }
            
        
    }, []);
    
    useEffect(() => {
        const id = localStorage.getItem('id');
    
        fetch('/api/businesses')
            .then(response => response.json())
            .then(data => {
                const businessData = data.filter(f => f.id == id);
                setBusinesses(businessData);
    
                if (businessData.length > 0) {
                    // Suponiendo que el objeto 'business' tiene un campo 'city'
                    const currentBusiness = businessData[0];
                    const filteredUsers = users.filter(user => user.city === currentBusiness.city);
                    setUsersInSameCity(filteredUsers);
                }
            })
            .catch(error => console.error('Error al cargar comercios:', error));
    }, [users]); //  las dependencias
    

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleTextInputChange = (e) => {
        setInputText(e.target.value);
    };
    
    return (
        <div>
            <ul>
                {businesses.map(business => (
                    <div key={business.id}>
                        <h1>NOMBRE: {business.name}</h1>
                        <h1>CIF: {business.CIF}</h1>
                        <h1>DIRECCIÓN: {business.direccion}</h1>
                        <h1>EMAIL: {business.email}</h1>
                        <h1>TELEFONO: {business.telefono}</h1>
                        <h1>DESCRIPCIÓN: {business.description}</h1>
                        <h1>Ciudad: {business.city}</h1>
                        <input type="file" onChange={handleImageChange} />
                        {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: '300px' }} />}
                        <input 
                            type="text" 
                            placeholder="Escribe algo aquí..." 
                            value={inputText}
                            onChange={handleTextInputChange}
                        />
                        <h2>Usuarios en la misma ciudad:</h2>
                        <ul>
                            {usersInSameCity.map(user => (
                                <li key={user.id}>{user.name} - {user.email}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </ul>
        </div>
    );
}
