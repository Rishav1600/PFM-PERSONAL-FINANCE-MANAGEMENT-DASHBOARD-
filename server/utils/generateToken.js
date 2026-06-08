const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for a user
 * @param {string} id - User ID
 * @returns {string} - JWT token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your_super_secret_key', {
        expiresIn: '30d',
    });
};

module.exports = generateToken;
