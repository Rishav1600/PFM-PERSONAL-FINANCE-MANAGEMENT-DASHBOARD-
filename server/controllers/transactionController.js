const Transaction = require('../models/transaction');

// @desc    Get all transactions for the logged-in user
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add new transaction
const addTransaction = async (req, res) => {
    try {
        const { amount, type, category, description, date } = req.body;

        if (!amount || !type || !category) {
            return res.status(400).json({ message: 'Please provide amount, type, and category' });
        }

        const transaction = await Transaction.create({
            user: req.user.id,
            amount,
            type,
            category,
            description,
            date: date || Date.now(),
        });

        res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete transaction
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await transaction.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction,
};
