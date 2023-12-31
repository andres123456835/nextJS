import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SearchBar from './components/SearchBar.client';
import Link from 'next/link';


export default function Home() {
    const handleSearch = (searchTerm) => {
        // Aquí puedes manejar la lógica de búsqueda o redirigir al usuario a una página de resultados
        console.log('Buscando:', searchTerm);
      };
    return (
        <div>
            <div>
                <Header usuarioLogueado={false} /> {/* Cambia esto según el estado de autenticación */}
                {/* Resto del contenido de tu página */}
            </div>
            <div>
                <HeroSection />
                {/* Otros componentes o secciones de tu página */}
            </div>
           
            <div>
                <ul>
                    <li>
                        <Link legacyBehavior href="pages/adminPanel">
                            <a>Admin</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/busquedaComercios">
                            <a>Buscador Comercios</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/detallesComercios">
                            <a>Detalles Comercios</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/error">
                            <a>ERROR</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/login">
                            <a>Login</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/perfilUsuario">
                            <a>Perfil Usuario</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
