const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
            default: function() {
                const now = new Date();
                return new Date(now.getFullYear(), now.getMonth(), 1); // First day of current month
            }
        },
        endDate: {
            type: Date,
            default: function() {
                const now = new Date();
                return new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of current month
            }
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Budget', BudgetSchema);
