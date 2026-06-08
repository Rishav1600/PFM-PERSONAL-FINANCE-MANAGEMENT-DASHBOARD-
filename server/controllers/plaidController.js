const plaidClient = require('../config/plaid');
const User = require('../models/user');
const Account = require('../models/Account');

// @desc    Create a link token for Plaid Link initialization
// @route   POST /api/plaid/create_link_token
// @access  Private
const createLinkToken = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        const configs = {
            user: {
                client_user_id: user._id.toString(),
            },
            client_name: 'Antigravity Finance',
            products: ['auth', 'transactions'],
            country_codes: ['US'],
            language: 'en',
        };

        const createTokenResponse = await plaidClient.linkTokenCreate(configs);
        res.json(createTokenResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Exchange public token for access token
// @route   POST /api/plaid/exchange_public_token
// @access  Private
const exchangePublicToken = async (req, res) => {
    try {
        const { public_token, metadata } = req.body;
        
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: public_token,
        });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        // Save accounts to database
        const accounts = metadata.accounts;
        for (const account of accounts) {
            await Account.create({
                user: req.user.id,
                plaidAccountId: account.id,
                name: account.name,
                type: account.type,
                subtype: account.subtype,
                balance: {
                    current: account.balance || 0,
                },
                mask: account.mask,
            });
        }

        // Ideally, you'd save the access token and item ID to the user's document or a separate 'Item' model
        // For simplicity, we'll just return success
        res.json({ message: 'Public token exchanged and accounts saved' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createLinkToken,
    exchangePublicToken,
};
