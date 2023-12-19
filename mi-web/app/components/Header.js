// En tu archivo Header.js

const Header = ({ usuarioLogueado }) => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Columna del Logo */}
                <div>
                    <img src="/path-to-your-logo.png" alt="Logo" className="h-8" />
                </div>

                {/* Columna de Navegación */}
                <nav className="flex gap-4">
                    <a href="/busqueda" className="hover:text-gray-300">Búsqueda de Comercios</a>
                    <a href="/registro" className="hover:text-gray-300">Registro/Login</a>
                    {/* Otros enlaces según sea necesario */}
                </nav>

                {/* Columna del Botón de Usuario */}
                <div>
                    {usuarioLogueado ? (
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Mi Cuenta
                        </button>
                    ) : (
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Iniciar Sesión
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
