import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).send('Token no proporcionado');
        }

        jwt.verify(token, 'WEB', (err, decodedUser) => {
            if (err) {
                return res.status(403).send('Token inválido o expirado');
            }

            // Ruta al archivo JSON
            const filePath = path.join(process.cwd(), 'data', 'users.json');
            const fileData = fs.readFileSync(filePath);
            const users = JSON.parse(fileData);

            // Buscar usuario por correo electrónico
            const user = users.find(u => u.email === decodedUser.email);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        });
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}