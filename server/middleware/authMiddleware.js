const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_key');
            
            if (!decoded || !decoded.id) {
                console.log("Invalid token payload");
                return res.status(401).json({ message: 'Not authorized, invalid token' });
            }

            // Get user from the token and attach it to the request object
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                console.log(`User not found for token ID: ${decoded.id}`);
                return res.status(401).json({ message: 'User not found' });
            }

            return next();
        } catch (error) {
            console.error("Auth Middleware Error:", error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
