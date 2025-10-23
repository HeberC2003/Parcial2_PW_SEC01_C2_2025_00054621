// 1. Importaciones
const express = require('express');
// Importamos NUESTRO enrutador
const accountRoutes = require('./routes/accountRoutes.js');

// 2. Crear instancia de express
const app = express();

// 3. Definir el puerto
const PORT = 3130;

// 4. Middlewares
app.use('/cuentas', accountRoutes);

// 5. Poner el servidor a escuchar
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto http://localhost:${PORT}`);
});