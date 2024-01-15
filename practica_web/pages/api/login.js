import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { compare } from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { email, password } = req.body;

    // Rutas a los archivos JSON
    const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
    const merchantsFilePath = path.join(process.cwd(), 'data', 'comercios.json');

    // Leer los archivos para obtener los usuarios y comerciantes
    const usersData = fs.readFileSync(usersFilePath);
    const merchantsData = fs.readFileSync(merchantsFilePath);
    const users = JSON.parse(usersData);
    const merchants = JSON.parse(merchantsData);


    // Buscar usuario o comerciante por email
    let user = users.find(user => user.email === email);
    let role;
    if (user) {
        role = user.role;
    }else{
        user = merchants.find(merchant => merchant.email === email);
        role = 'merchant';
    }

    if (!user) {
        return res.status(404).json({ message: 'Usuario o comerciante no encontrado' });
    }

    // Verificar la contraseña hasheada
    const isValid = await compare(password, user.password);
    if (!isValid) {
        return res.status(403).json({ message: 'Contraseña incorrecta' });
    }

    // Si las credenciales son correctas, genera un token incluyendo el rol
    const token = jwt.sign(
        { email: email, role: role },
        'HOLA', // Asegúrate de usar una clave secreta más segura en producción
        { expiresIn: '1h' }
    );

    res.status(200).json({ token });
}
