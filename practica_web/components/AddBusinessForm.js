// components/AddBusinessForm.js
import React, { useState } from 'react';

const AddBusinessForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
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
