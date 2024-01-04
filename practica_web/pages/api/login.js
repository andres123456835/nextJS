import fs from 'fs';
import path from 'path';
import { compare } from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { email, password } = req.body;

    // Ruta al archivo JSON
    const filePath = path.join(process.cwd(), 'data', 'users.json');

    // Leer el archivo para obtener los usuarios existentes
    const fileData = fs.readFileSync(filePath);
    const users = JSON.parse(fileData);

    // Buscar usuario por email
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña hasheada
    const isValid = await compare(password, user.password);
    if (!isValid) {
        return res.status(403).json({ message: 'Contraseña incorrecta' });
    }

    // Aquí se manejaría la creación de la sesión o token (simulado)
    res.status(200).json({ message: 'Inicio de sesión exitoso' });

    

}
