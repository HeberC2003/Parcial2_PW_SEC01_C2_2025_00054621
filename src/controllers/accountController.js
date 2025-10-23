const accounts = require('../data/accounts.js');

const getAllAccounts = (req, res) => {
    res.json({
        count: accounts.length,
        data: accounts
    });
};

const getAccountById = (req, res) => {
    const accountId = req.params.id;
    const account = accounts.find(acc => acc._id === accountId);

    if (account) {
        res.json({
            finded: true,
            account: account
        });
    } else {
        res.status(404).json({
            finded: false,
            message: "Cuenta no encontrada"
        });
    }
};

const getAccountsByQuery = (req, res) => {
    const { id, client, gender } = req.query;
    let filteredAccounts = [];

    if (id) {
        filteredAccounts = accounts.filter(acc => acc._id === id);
    } else if (client) {
        filteredAccounts = accounts.filter(acc => acc.client.toLowerCase().includes(client.toLowerCase()));
    } else if (gender) {
        filteredAccounts = accounts.filter(acc => acc.gender.toLowerCase() === gender.toLowerCase());
    } else {
        return res.status(400).json({ message: "Parámetro de búsqueda no válido (usar id, client, o gender)." });
    }

    if (filteredAccounts.length > 0) {
        const response = { finded: true };

        if (filteredAccounts.length === 1) {
            response.account = filteredAccounts[0];
        } else {
            response.data = filteredAccounts;
        }
        res.json(response);
    } else {
        res.status(404).json({ finded: false, message: "No se encontraron cuentas con ese criterio." });
    }
};

// Controlador para obtener el balance total de cuentas activas
const getAccountsBalance = (req, res) => {
    // 1. Filtramos para quedarnos solo con las cuentas activas
    const activeAccounts = accounts.filter(acc => acc.isActive === true);

    // 2. Verificamos si hay cuentas activas para sumar
    if (activeAccounts.length === 0) {
        return res.json({
            status: false,
            message: "No se encontraron cuentas activas para sumar."
        });
    }

    // 3. Sumamos los balances
    const totalBalance = activeAccounts.reduce((sum, account) => {
        // Convertimos el string de balance a un número antes de sumar
        return sum + parseFloat(account.balance);
    }, 0); // El 0 es el valor inicial de la suma

    // 4. Devolvemos la respuesta en el formato solicitado
    res.json({
        status: true,
        accountBalance: totalBalance
    });
};

module.exports = {
    getAllAccounts,
    getAccountById,
    getAccountsByQuery,
    getAccountsBalance
};
