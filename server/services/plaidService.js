const plaidClient = require('../config/plaid');

/**
 * Get accounts for a specific access token
 * @param {string} accessToken 
 * @returns {Promise<Array>}
 */
const getAccounts = async (accessToken) => {
    try {
        const response = await plaidClient.accountsGet({
            access_token: accessToken,
        });
        return response.data.accounts;
    } catch (error) {
        console.error('Error fetching accounts from Plaid:', error);
        throw error;
    }
};

/**
 * Get transactions for a specific access token and date range
 * @param {string} accessToken 
 * @param {string} startDate (YYYY-MM-DD)
 * @param {string} endDate (YYYY-MM-DD)
 * @returns {Promise<Array>}
 */
const getTransactions = async (accessToken, startDate, endDate) => {
    try {
        const response = await plaidClient.transactionsGet({
            access_token: accessToken,
            start_date: startDate,
            end_date: endDate,
        });
        return response.data.transactions;
    } catch (error) {
        console.error('Error fetching transactions from Plaid:', error);
        throw error;
    }
};

module.exports = {
    getAccounts,
    getTransactions,
};
