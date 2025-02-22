const axios = require('axios');
const authService = require('../services/authService');

const searchProducts = async (req, res) => {
    const { image } = req.body; // La imagen en base64

    try {
        const token = await authService.getAccessToken();

        if (!token) {
            return res.status(500).json({ error: 'Error al obtener el token' });
        }

        const response = await axios.post('https://api.inditex.com/visual-search', {
            image: image,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        res.json(response.data); // Devuelve los productos
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error en la búsqueda' });
    }
};

module.exports = {
    searchProducts,
};