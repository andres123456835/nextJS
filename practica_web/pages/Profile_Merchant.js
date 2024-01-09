import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LogoutButton from '../components/LogoutButton';

const ProfilePage_merchant = () => {
    const [userProfile, setUserProfile] = useState(null);
    const router = useRouter();

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
                setUserProfile(data);
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

    if (!userProfile) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <div>
            <h1>Perfil de Usuario</h1>
            <p>Nombre: {userProfile.name}</p>
            <p>Email: {userProfile.email}</p>
            <LogoutButton onLogout={handleLogout} />
            {/* Aquí podrías añadir más información del perfil */}
        </div>
    );
};

export default ProfilePage_merchant;
