// 1. Importaciones
const express = require('express');
const accountsData = require('./data/accounts.js'); // Importamos nuestros datos

// 2. Crear instancia de express
const app = express();

// 3. Definir el puerto
const PORT = 3130;

// Endpoint para obtener todas las cuentas
app.get('/cuentas', (req, res) => {
    res.json({
        count: accountsData.length,
        data: accountsData
    });
});

// 4. Poner el servidor a escuchar
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto http://localhost:${PORT}`);
});