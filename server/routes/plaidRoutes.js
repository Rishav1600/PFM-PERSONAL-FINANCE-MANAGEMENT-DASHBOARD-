const express = require('express');
const router = express.Router();
const { createLinkToken, exchangePublicToken } = require('../controllers/plaidController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create_link_token', protect, createLinkToken);
router.post('/exchange_public_token', protect, exchangePublicToken);

module.exports = router;
