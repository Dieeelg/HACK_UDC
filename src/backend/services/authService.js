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

module.exports = {
    getAccessToken,
};