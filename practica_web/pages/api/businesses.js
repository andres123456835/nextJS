import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Función para cargar los comercios desde el archivo JSON
function loadComercios() {
    const filePath = path.join(process.cwd(), 'data', 'comercios.json');
    const jsonData = fs.readFileSync(filePath);
    return JSON.parse(jsonData);
}

function saveComercios(comercios) {
    try {
        const filePath = path.join(process.cwd(), 'data', 'comercios.json');
        const jsonData = JSON.stringify(comercios, null, 2);
        fs.writeFileSync(filePath, jsonData);
    } catch (error) {
        console.error('Error al guardar comercios:', error);
        return res.status(500).json({ message: 'Error al guardar comercios' });
    }
}



export default async function handler(req, res) {
    if (req.method === 'GET') {
        const comercios = loadComercios();
        const { email } = req.query; // Utiliza el parámetro 'email' para buscar un comercio 
        if (email) {
            // Buscar y devolver un comercio específico
            const comercio = comercios.find(c => c.email === email);
            if (comercio) {
                res.status(200).json(comercio);
            } else {
                res.status(404).json({ message: 'Comercio no encontrado' });
            }
        } else {
            // Devolver la lista completa de comercios
            res.status(200).json(comercios);
        }
    } else if (req.method === 'POST') {
        // Lógica para añadir un nuevo comercio
        const comercios = loadComercios();
        const newBusiness = req.body;
    
        // Valida que el comercio no exista ya
        if (comercios.some(c => c.email === newBusiness.email)) {
            return res.status(400).json({ message: 'El comercio ya existe' });
        }
    
        if (newBusiness.password) {
            const salt = await bcrypt.genSalt(10);
            newBusiness.password = await bcrypt.hash(newBusiness.password, salt);
        }
    
        // Asigna un nuevo ID
        const newId = comercios.length > 0 ? Math.max(...comercios.map(c => c.id)) + 1 : 1;
        const businessToAdd = { ...newBusiness, id: newId };
    
        comercios.push(businessToAdd);
        saveComercios(comercios);
        res.status(201).json({ message: 'Negocio añadido', business: businessToAdd });
        
    } else if(req.method === 'DELETE'){
        const { id } = req.body; // Asume que el ID se pasa como parámetro de consulta
        console.log('ID recibido:', id, typeof id);
        const comercios = loadComercios();
        console.log('Comercios cargados:', comercios);

        // Verificar si el comercio existe
        const comercioIndex = comercios.findIndex(c => c.id === id);
        if (comercioIndex !== -1) {
            comercios.splice(comercioIndex, 1);
            saveComercios(comercios);
            res.status(200).json({ message: 'Comercio eliminado con éxito' });
        }else {
            res.status(404).json({ message: 'Comercio no encontrado' });
        }


    } else {
        // Método no soportado
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    
}
