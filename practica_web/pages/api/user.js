import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            // Extraer el email del usuario del token
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'HOLA');
            const userEmail = decoded.email;

            // Cargar usuarios
            const filePath = path.join(process.cwd(), 'data', 'users.json');
            const usersData = fs.readFileSync(filePath);
            let users = JSON.parse(usersData);

            // Filtrar el usuario a eliminar
            users = users.filter(user => user.email !== userEmail);

            // Guardar la nueva lista de usuarios
            fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

            return res.status(200).json({ message: 'Usuario eliminado con éxito' });
        } catch (error) {
            console.error('Error en el servidor:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    if (req.method === 'GET') {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).send('Token no proporcionado');
        }

        jwt.verify(token, 'HOLA', (err, decodedUser) => {
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
    } else if(req.method === 'PUT'){
        try {
            // Extraer el token y decodificarlo
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'HOLA');

            // Extraer los datos actualizados del cuerpo de la solicitud
            const updatedData = req.body;

            // Ruta al archivo JSON y carga de datos
            const filePath = path.join(process.cwd(), 'data', 'users.json');
            const usersData = fs.readFileSync(filePath);
            let users = JSON.parse(usersData);

            // Buscar el índice del usuario a actualizar
            console.log(updatedData.email);
            const userIndex = users.findIndex(u => u.email === updatedData.emailhidden);
            console.log(userIndex);
            if (userIndex === -1) {
                //return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Actualizar los datos del usuario
            users[userIndex] = { ...users[userIndex], ...updatedData };

            // Guardar la nueva lista de usuarios
            fs.writeFileSync(filePath, JSON.stringify(users, null, 2));


            //actualizar token
            /*const tok = jwt.sign(
                { email: updatedData.email, role: decoded.role },
                'HOLA', // Asegúrate de usar una clave secreta más segura en producción
                { expiresIn: '1h' }
            );
            localStorage.setItem('token', token);*/


            return res.status(200).json(users[userIndex]);
        } catch (error) {
            console.error('Error en el servidor:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

    }else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}