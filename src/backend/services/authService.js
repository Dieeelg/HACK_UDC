const axios = require('axios');
const authConfig = require('../config/auth');

const getAccessToken = async () => {
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', authConfig.CLIENT_ID);
        params.append('client_secret', authConfig.CLIENT_SECRET);

        const response = await axios.post(authConfig.TOKEN_URL, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error al obtener el token:', error.response?.data || error.message);
        return null;
    }
};

/**
 * Método para buscar productos similares a una imagen.
 * @param {string} imageUrl - URL de la imagen para la búsqueda visual.
 * @param {number} page - Número de página (opcional, por defecto 1).
 * @param {number} perPage - Número de productos por página (opcional, por defecto 5).
 * @returns {Promise<Array>} - Lista de productos similares.
 */
async function searchByImage(imageUrl, page = 1, perPage = 10) {
    const baseUrl = "https://api.inditex.com/pubvsearch/products";
    const apiKey = "~I*IEVQZ6fw{4u1g"; // Reemplaza con tu API key de Inditex

    try {
        // Configuración de la solicitud
        const response = await axios.get(baseUrl, {
            params: {
                image: imageUrl, // URL de la imagen
                page: page, // Número de página
                perPage: perPage, // Productos por página
            },
            headers: {
                Authorization: `Bearer ${apiKey}`, // Autenticación con API key
                "Content-Type": "application/json",
            },
        });

        // Si la respuesta es exitosa, devuelve los productos
        if (response.status === 200) {
            return response.data; // Devuelve la lista de productos
        }
    } catch (error) {
        // Manejo de errores
        if (error.response) {
            // Errores de la API
            switch (error.response.status) {
                case 400:
                    throw new Error("Parámetros de la solicitud inválidos.");
                case 401:
                    throw new Error("Autenticación fallida o no proporcionada.");
                case 403:
                    throw new Error("Permisos denegados para la solicitud.");
                case 404:
                    throw new Error("No se encontraron productos para la imagen proporcionada.");
                case 429:
                    throw new Error("Límite de solicitudes excedido.");
                case 500:
                    throw new Error("Error interno del servidor.");
                default:
                    throw new Error("Error desconocido al realizar la solicitud.");
            }
        } else {
            // Errores de red o del cliente
            throw new Error("Error de conexión o solicitud inválida.");
        }
    }
}

/**
 * Método para buscar productos por palabras clave.
 * @param {string} query - Palabras clave para la búsqueda (requerido).
 * @param {string} brand - Marca para filtrar la búsqueda (opcional).
 * @param {number} page - Número de página (opcional, por defecto 1).
 * @param {number} perPage - Número de productos por página (opcional, por defecto 5).
 * @returns {Promise<Array>} - Lista de productos encontrados.
 */
async function searchByQuery(query, brand = "", page = 1, perPage = 5) {
    const baseUrl = "https://api.inditex.com/searchpmpa/products";
    const apiKey = "TU_API_KEY"; // Reemplaza con tu API key de Inditex

    try {
        // Configuración de la solicitud
        const response = await axios.get(baseUrl, {
            params: {
                query: query, // Palabras clave para la búsqueda
                brand: brand, // Marca para filtrar (opcional)
                page: page, // Número de página
                perPage: perPage, // Productos por página
            },
            headers: {
                Authorization: `Bearer ${apiKey}`, // Autenticación con API key
                "Content-Type": "application/json",
            },
        });

        // Si la respuesta es exitosa, devuelve los productos
        if (response.status === 200) {
            return response.data; // Devuelve la lista de productos
        }
    } catch (error) {
        // Manejo de errores
        if (error.response) {
            // Errores de la API
            switch (error.response.status) {
                case 400:
                    throw new Error("Parámetros de la solicitud inválidos.");
                case 401:
                    throw new Error("Autenticación fallida o no proporcionada.");
                case 403:
                    throw new Error("Permisos denegados para la solicitud.");
                case 404:
                    throw new Error("No se encontraron productos para la búsqueda proporcionada.");
                case 429:
                    throw new Error("Límite de solicitudes excedido.");
                case 500:
                    throw new Error("Error interno del servidor.");
                default:
                    throw new Error("Error desconocido al realizar la solicitud.");
            }
        } else {
            // Errores de red o del cliente
            throw new Error("Error de conexión o solicitud inválida.");
        }
    }
}

module.exports = {
    getAccessToken,
    searchByImage,
    searchByQuery
};