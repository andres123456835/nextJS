let businesses = [
    
    // Más negocios...
];

export default function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;
        /*if (id) {
            const business = businesses.find(b => b.id === parseInt(id, 10));
            if (business) {
                res.status(200).json(business);
            } else {
                res.status(404).json({ message: 'Negocio no encontrado' });
            }
        } else */if(id){
            const fil = businesses.filter(f => f.id != id)
            businesses = fil.map(f  => ({
                name: f.name,
                CIF:f.CIF,
                direccion:f.direccion,
                email:f.email,
                telefono:f.telefono,
                description: f.description,
            }))

            res.status(200).json(businesses);
        } else {
            res.status(200).json(businesses);
        }
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
