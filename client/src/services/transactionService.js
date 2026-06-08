import api from './api';

// Fetch all transactions
const getTransactions = async () => {
    const response = await api.get('/transactions');
    return response.data;
};

// Create new transaction
const createTransaction = async (transactionData) => {
    const response = await api.post('/transactions', transactionData);
    return response.data;
};

// Delete transaction
const deleteTransaction = async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
};

const transactionService = {
    getTransactions,
    createTransaction,
    deleteTransaction
};

export default transactionService;
