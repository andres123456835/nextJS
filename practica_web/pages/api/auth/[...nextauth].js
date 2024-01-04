// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Aquí agregarías la lógica para verificar las credenciales del usuario
        if (credentials.username === 'user' && credentials.password === 'pass') {
          return { id: 1, name: 'Usuario', email: 'usuario@example.com' }
        } else {
          return null;
        }
      }
    }),
    // Puedes agregar más proveedores aquí
  ],
  // Agrega configuraciones adicionales si son necesarias
});
