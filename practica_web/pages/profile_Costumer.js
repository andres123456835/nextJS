import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LogoutButton from '../components/LogoutButton';

const profile_Costumer = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedEmailHidden, seteditedEmailHidden] = useState('');
    
    const router = useRouter();

    useEffect(() => {
        if (userProfile) {
            setEditedName(userProfile.name);
            setEditedEmail(userProfile.email);
            seteditedEmailHidden(userProfile.email);
            // Repite para los demás campos que quieras editar
        }
    }, [userProfile]);

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

    const handleDeleteAccount = async () => {
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar tu cuenta?');
        if (!confirmDelete) {
            return;
        }
    
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('/api/user', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.ok) {
                alert('Cuenta eliminada con éxito');
                localStorage.removeItem('token');
                router.push('/');
            } else {
                alert('Error al eliminar la cuenta');
            }
        } catch (error) {
            console.error('Error al eliminar la cuenta:', error);
        }
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');

        const updatedUser = {
            name: editedName,
            email: editedEmail,
            emailhidden:editedEmailHidden,
            // Incluye aquí otros campos que el usuario pueda editar
        };

        const response = await fetch('/api/user', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser)
        });

        /*if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error('Error al update los datos del usuario');
        }*/

        
    
        try {
            const response = await fetch('/api/user', {
                method: 'PUT', // o 'PATCH' según tu API
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser)
            });
    
            if (response.ok) {
                // Actualiza el estado userProfile con los nuevos datos
                const data = await response.json();
                setUserProfile(data);
                setIsEditing(false); // Salir del modo edición
            } else {
                console.error('Error al actualizar los datos del usuario');
                // Aquí puedes manejar errores, como mostrar un mensaje al usuario
            }
            router.push("/login")
        } catch (error) {
            console.error('Error al enviar la solicitud de actualización:', error);
            // Manejar el error, posiblemente actualizar el estado para mostrar un mensaje de error
        }
    };
    

    
    if (!userProfile) {
        return <p>No existe el usuario...</p>;
        
    }

    return (
        <div>
            <h1>Perfil de Usuario</h1>
            {isEditing ? (
                <>
                    <input 
                        type="text" 
                        value={editedName} 
                        onChange={(e) => setEditedName(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        value={editedEmail} 
                        onChange={(e) => setEditedEmail(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        hidden = "true"
                        value={editedEmailHidden} 
                    />
                    {/* Agrega más inputs según sea necesario */}
                </>
            ) : (
                <>
                    <p>Nombre: {userProfile.name}</p>
                    <p>Email: {userProfile.email}</p>
                    {/* Muestra más información del usuario */}
                </>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancelar' : 'Modificar'}
            </button>
            {isEditing && <button onClick={handleUpdate}>Guardar Cambios</button>}
            <LogoutButton onLogout={handleLogout} />
            <button onClick={handleDeleteAccount}>Dar de baja</button>
    </div>
    );
};

export default profile_Costumer;
