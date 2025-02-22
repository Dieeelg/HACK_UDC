require('dotenv').config();
const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = 3001;

app.use(express.json());

// Endpoint para obtener el estado de un pedido
app.get('/api/order-status/:orderId', (req, res) => {
    const orderId = req.params.orderId; // Obtén el ID del pedido desde la URL
    const jwtToken = process.env.JWT_TOKEN; // Obtén el token JWT desde las variables de entorno

    if (!jwtToken) {
        return res.status(500).json({ error: 'JWT_TOKEN no está configurado.' });
    }

    // Comando curl para obtener el estado del pedido
    const curlCommand = `curl -X GET "https://api-sandbox.inditex.com/pubordtrck-sandbox/lefties/orders/${orderId}" \
    -H "Authorization: Bearer ${jwtToken}" \
    -H "Content-Type: application/json"`;

    // Ejecuta el comando curl
    exec(curlCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error en la solicitud a la API:', error);
            return res.status(500).json({ error: 'Error en la solicitud a la API' });
        }

        if (stderr) {
            console.error('Error en la solicitud a la API:', stderr);
            return res.status(500).json({ error: 'Error en la solicitud a la API' });
        }

        try {
            const response = JSON.parse(stdout); // Parsea la respuesta de la API
            res.json(response); // Devuelve la respuesta al frontend
        } catch (parseError) {
            console.error('Error al parsear la respuesta:', parseError);
            res.status(500).json({ error: 'Error al procesar la respuesta' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});