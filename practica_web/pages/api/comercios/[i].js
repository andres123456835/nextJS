// pages/api/comercios/[id].js
import fs from 'fs';
import path from 'path';

const comerciosFilePath = path.join(process.cwd(), 'data', 'comercios.json');

function readComerciosData() {
    const fileData = fs.readFileSync(comerciosFilePath);
    return JSON.parse(fileData);
}

export default function handler(req, res) {
    const { id } = req.query;
    const comercios = readComerciosData();

    const comercioIndex = comercios.findIndex(c => c.id === parseInt(id));
    if (comercioIndex === -1) {
        res.status(404).json({ message: 'Comercio no encontrado' });
        return;
    }

    if (req.method === 'GET') {
        res.status(200).json(comercios[comercioIndex]);
    } else if (req.method === 'PUT') {
        const comercioActualizado = req.body;
        comercios[comercioIndex] = { ...comercios[comercioIndex], ...comercioActualizado };
        fs.writeFileSync(comerciosFilePath, JSON.stringify(comercios, null, 2));
    res.status(200).json({ message: 'Comercio actualizado', comercio: comercios[comercioIndex] });
    } else if (req.method === 'DELETE') {
        comercios.splice(comercioIndex, 1);

    fs.writeFileSync(comerciosFilePath, JSON.stringify(comercios, null, 2));
    res.status(200).json({ message: 'Comercio eliminado' });
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
