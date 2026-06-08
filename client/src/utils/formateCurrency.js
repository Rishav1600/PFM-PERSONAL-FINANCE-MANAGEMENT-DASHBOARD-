/**
 * Formats a numeric value into a currency string (USD)
 * @param {number} amount - The numeric value to format
 * @returns {string} - The formatted currency string
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

export default formatCurrency;
