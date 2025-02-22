require('dotenv').config();
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = 3001;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api', apiRoutes);

// Ruta raíz (opcional)
app.get('/', (req, res) => {
    res.send('¡Bienvenido al backend de Visual Search!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});