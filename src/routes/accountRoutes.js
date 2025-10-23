// src/routes/accountRoutes.js

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController.js');

router.get('/balance', accountController.getAccountsBalance);

// Ruta principal que maneja ambos casos: con y sin query params
router.get('/', (req, res) => {
    // Verificamos si la URL contiene parámetros de consulta
    if (Object.keys(req.query).length > 0) {
        // Si hay parámetros, llamamos a la función de BÚSQUEDA
        accountController.getAccountsByQuery(req, res);
    } else {
        // Si NO hay parámetros, llamamos a la función que devuelve TODO
        accountController.getAllAccounts(req, res);
    }
});

router.get('/:id', accountController.getAccountById);

module.exports = router;