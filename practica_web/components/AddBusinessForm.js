// components/AddBusinessForm.js
import React, { useState } from 'react';

const AddBusinessForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        password:'',
        CIF:'',
        direccion:'',
        email:'',
        telefono:'',
        description: '',
        city:'',
        role:'merchant',
        // otros campos según sea necesario
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/businesses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Manejo post-submit, como mostrar mensaje de éxito
            } else {
                // Manejar errores, por ejemplo, mostrar mensaje de error
            }
        } catch (error) {
            // Manejar excepciones
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre del negocio"
                required
            />
            <input
                type="text"
                name="CIF"
                value={formData.CIF}
                onChange={handleChange}
                placeholder="CIF del negocio"
                required
            />
            <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="direccion del negocio"
                required
            />
            <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email del negocio"
                required
            />
            <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password del negocio"
                required
            />
            <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="telefono del negocio"
                required
            />
            <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="ciudad del negocio"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripción del negocio"
                required
            />
            {/* otros campos de entrada */}
            <button type="submit">Agregar Negocio</button>
        </form>
    );
};

export default AddBusinessForm;
