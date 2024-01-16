import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LogoutButton from '../components/LogoutButton';

const ProfilePage_merchant = () => {
    const [CostumerProfile, setCostumerProfile] = useState(null);
    const router = useRouter();

    


    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            router.push('/login'); // Si no hay usuario autenticado, redirigir al login
            return;
        }

        const fetchUserData = async () => {
            
            const response = await fetch(`/api/businesses`, {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setCostumerProfile(data);
            } else {
                console.error('Error al cargar los datos del usuario');
                if (response.status === 404) {
                    console.error('Perfil no encontrado');
                }
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

    if (!CostumerProfile) {
        return <p>Cargando perfil...</p>;
    }
    console.log("hola: ",CostumerProfile);
    return (
        <div>
            <h1>Perfil de Comercio</h1>
            <p>Nombre: {CostumerProfile.name}</p>
            <p>Email: {CostumerProfile.email}</p>
            <LogoutButton onLogout={handleLogout} />
            {/* Aquí podrías añadir más información del perfil */}
        </div>
    );
};

export default ProfilePage_merchant;
