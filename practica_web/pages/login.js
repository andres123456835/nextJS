import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [irabusiness,setirabusiness] = useState(
        ""
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });
            //const data = await response.json();
            if(response.ok){
                const {token} = await response.json();
                localStorage.setItem('token', token);
                if(response.status == 200 && formData.email=="admin@admin.com"){
                    router.push('../admi');
                }
                else if(response.status == 200){
                     // Aquí puedes manejar la respuesta
                    router.push('../profile');
                }
            }
           
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Iniciar sesión</button>
            </form>

        </div>
    );
};

export default LoginPage;
