const axios = require('axios');

const CLIENT_ID = 'oauth-mkpsbox-oauthmmrudcfqgxbeubxzfssnbxpro';
const CLIENT_SECRET = '~I*IEVQZ6fw{4u1g';
const TOKEN_URL = 'https://auth.inditex.com/openam/oauth2/itxid/itxidmp/sandbox/access_token';

const getAccessToken = async () => {
  try {
    // Usar URLSearchParams para codificar el cuerpo de la solicitud
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials'); // Esto podría variar dependiendo del flujo de OAuth
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);

    const response = await axios.post(TOKEN_URL, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Si la solicitud es exitosa, el access_token estará en la respuesta
    console.log('Access Token:', response.data.access_token);
  } catch (error) {
    console.error('Error al obtener el token:', error);
  }
};

getAccessToken();