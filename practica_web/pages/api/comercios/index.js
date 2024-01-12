// pages/api/comercios/index.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Definir la ruta al archivo JSON
        const filePath = path.join(process.cwd(), 'data', 'comercios.json');

        // Leer el archivo JSON
        let comercios;
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            comercios = JSON.parse(fileData);
        } catch (error) {
            // Manejar posibles errores de lectura o parseo
            res.status(500).json({ message: 'Error al leer los datos de comercios' });
            return;
        }

        // Devolver los comercios como respuesta
        res.status(200).json(comercios);
    } else {
        // Manejar métodos no permitidos
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
