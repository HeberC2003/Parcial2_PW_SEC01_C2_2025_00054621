// Importamos los datos
const accounts = require('../data/accounts.js');

// Controlador para obtener todas las cuentas
const getAllAccounts = (req, res) => {
    res.json({
        count: accounts.length,
        data: accounts
    });
};

// Controlador para obtener una cuenta por su ID
const getAccountById = (req, res) => {
    // 1. Obtenemos el ID que viene en la URL
    const accountId = req.params.id;

    // 2. Buscamos la cuenta en nuestro arreglo de datos
    const account = accounts.find(acc => acc._id === accountId);

    // 3. Verificamos si la cuenta fue encontrada
    if (account) {
        // Si se encontró, la devolvemos
        res.json({
            finded: true,
            account: account
        });
    } else {
        // Si no se encontró, devolvemos un mensaje de error
        res.status(404).json({
            finded: false,
            message: "Cuenta no encontrada"
        });
    }
};

// Exportamos las funciones para poder usarlas en las rutas
module.exports = {
    getAllAccounts,
    getAccountById
};