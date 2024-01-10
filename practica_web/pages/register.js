import { useState } from 'react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const [jsondata, setjsondata] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data); // Aquí puedes manejar la respuesta
            if(response.status == 201){
                setjsondata(formData);
            }else{
                setjsondata({
                    name: '',
                    email: '',
                    password: '',
                    role:'',
                });
            }
            

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select 
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Selecciona un rol</option>
                    <option value="customer">Cliente</option>
                    <option value="merchant">Comerciante</option>
                </select>
                <button type="submit">Registrarse</button>
            </form>

            <label>Nombre:{jsondata.name}</label><br/>
            <label>Password:{jsondata.password}</label><br/>
            <label>Email:{jsondata.email}</label><br/>
            <label>rol:{jsondata.role}</label>
        </div>
    );
};

export default RegisterPage;
