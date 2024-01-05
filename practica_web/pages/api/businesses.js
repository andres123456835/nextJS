const businesses = [
    { id: 1, name: 'Negocio 1', CIF:'prueba', direccion:'madrid', email:'prueba@prueba.es', telefono:'123456789' },
    // Más negocios...
];

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(businesses);
    } else if (req.method === 'POST') {
        // Obtener los datos enviados en la solicitud POST
        const newBusiness = req.body;

        // Aquí deberías validar los datos del nuevo negocio
        // Por ejemplo, asegurarte de que el nombre del negocio no esté vacío
        if (!newBusiness.name) {
            res.status(400).json({ error: 'El nombre del negocio es requerido' });
            return;
        }

        // Añadir lógica para generar un nuevo ID para el negocio
        // Esto es solo un ejemplo simple basado en la longitud del array
        const newId = businesses.length + 1;
        const businessToAdd = { ...newBusiness, id: newId };

        // Añadir el nuevo negocio a la lista de negocios
        businesses.push(businessToAdd);

        // Enviar una respuesta de éxito
        res.status(201).json({ message: 'Negocio añadido', business: businessToAdd });
    } else {
        // Método no soportado
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
