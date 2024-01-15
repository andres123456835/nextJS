import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LogoutButton from '../components/LogoutButton';

const AdminPage = ({ adminData }) => {
    const router = useRouter();

    const goToBusinessAddition = () => {
        router.push('/admin/add-business');
    };

    const goToBusinessList = () => {
        router.push('/');
    };
    const [userAdmin, setUserAdmin] = useState(null);
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            router.push('/login'); // Si no hay usuario autenticado, redirigir al login
            return;
        }

        const fetchUserData = async () => {
            
            const response = await fetch(`/api/user`, {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUserAdmin(data);
            } else {
                console.error('Error al cargar los datos del usuario');
            }
        };

        fetchUserData();
    }, [router]);

    const handleLogout = () => {    
        localStorage.removeItem('token');
        // Redirigir al usuario a la página de inicio o login
        localStorage.removeItem('isAuthenticated');
        router.push('/login');
    };

    if (!userAdmin) {
        return <p>Cargando perfil...</p>;
    }
    return (
            <div>
                <h1>Perfil de Usuario</h1>
                <p>Nombre: {userAdmin.name}</p>
                <p>Email: {userAdmin.email}</p>
                <button onClick={goToBusinessAddition}>Añadir Comercio</button>
                <button onClick={goToBusinessList}>Buscar Comercio</button>               
                <LogoutButton onLogout={handleLogout} />
                
            </div>
        
    );
};

export default AdminPage;

