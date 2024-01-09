import jwt_decode from 'jwt-decode';
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
                // Decodificar el token para obtener el rol
                const decoded = jwt_decode(token);
                const userRole = decoded.role;
                // Redirigir al usuario según su rol
                if (userRole === 'admin') {
                    router.push('../admi');
                } else if (userRole === 'customer') {
                    router.push('../profile_Customer');
                } else if (userRole === 'merchant') {
                    router.push('../Profile_Merchant');
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
