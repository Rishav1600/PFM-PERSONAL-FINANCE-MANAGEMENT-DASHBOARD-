const Budget = require('../models/Budget');

// @desc    Get all budgets for the logged-in user
// @route   GET /api/budgets
// @access  Private
const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user.id });
        res.status(200).json(budgets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Set or update a budget
// @route   POST /api/budgets
// @access  Private
const setBudget = async (req, res) => {
    try {
        const { category, amount, startDate, endDate } = req.body;

        if (!category || !amount) {
            return res.status(400).json({ message: 'Please provide category and amount' });
        }

        // Check if a budget for this category already exists for the user
        let budget = await Budget.findOne({ user: req.user.id, category });

        if (budget) {
            // Update existing budget
            budget.amount = amount;
            if (startDate) budget.startDate = startDate;
            if (endDate) budget.endDate = endDate;
            
            await budget.save();
            return res.status(200).json(budget);
        } else {
            // Create new budget
            budget = await Budget.create({
                user: req.user.id,
                category,
                amount,
                startDate: startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                endDate: endDate || new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
            });
            return res.status(201).json(budget);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a budget
// @route   DELETE /api/budgets/:id
// @access  Private
const deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        // Make sure the logged in user matches the budget user
        if (budget.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await budget.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getBudgets,
    setBudget,
    deleteBudget,
};
