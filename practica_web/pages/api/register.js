import fs from 'fs';
import path from 'path';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { name, email, password, city, role } = req.body;

    // Definir la ruta al archivo JSON
    const filePath = path.join(process.cwd(), 'data', 'users.json');

    // Leer el archivo para obtener los usuarios existentes
    const fileData = fs.readFileSync(filePath);
    const users = JSON.parse(fileData);

    // Verificar si el usuario ya existe
    if (users.some(user => user.email === email)) {
        return res.status(422).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await hash(password, 12);

    // Crear el nuevo usuario y añadirlo a la lista
    // Crear el nuevo usuario con el rol y añadirlo a la lista
    const newUser = { 
        id: users.length + 1, 
        name, 
        email, 
        password: hashedPassword,
        city,
        role // Añadiendo el rol aquí
    };
    users.push(newUser);
    
    

    // Guardar la nueva lista de usuarios en el archivo
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'Usuario creado' });
}
